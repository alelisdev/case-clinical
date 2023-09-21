"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_mailbox_feature_src_index_ts"],{

/***/ 291997:
/*!***********************************************!*\
  !*** ./libs/web/mailbox/feature/src/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxModule": () => (/* reexport safe */ _lib_mailbox_module__WEBPACK_IMPORTED_MODULE_0__.MailboxModule)
/* harmony export */ });
/* harmony import */ var _lib_mailbox_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/mailbox.module */ 195240);


/***/ }),

/***/ 899946:
/*!**********************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/auth/mail-auth.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailAuthComponent": () => (/* binding */ MailAuthComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mailbox.service */ 652318);







class MailAuthComponent {
  constructor(sanitizer, route, _mailboxService) {
    this.sanitizer = sanitizer;
    this.route = route;
    this._mailboxService = _mailboxService;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.token && params.email) {
        // this._mailboxService.token = params.token;
        // this._mailboxService.email = params.email;
        this._mailboxService.setEmailService({
          token: params.token,
          email: params.email
        });
        // window.opener.location ='http://localhost:4200/#/apps/mailbox';
        window.opener.location.reload();
        window.close();
      }
    });
  }
  authenticate() {
    let url = `${this._mailboxService.url}/register?state=${window.location.origin}`;
    if (window.location.href.includes('#')) {
      url = url + '?hash=true';
    }
    console.log(url);
    open(url, 'popup', 'popup=true');
  }
}
MailAuthComponent.ɵfac = function MailAuthComponent_Factory(t) {
  return new (t || MailAuthComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_3__.MailboxService));
};
MailAuthComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MailAuthComponent,
  selectors: [["mail-auth"]],
  decls: 4,
  vars: 0,
  consts: [[1, "flex", "items-center", "justify-center", 2, "width", "100%", "height", "100%"], [1, "m-auto"], ["type", "button", 1, "inline-flex", "items-center", "px-6", "py-10", "h-12", "text-2xl", "font-medium", "leading-6", "text-white", "transition", "duration-150", "ease-in-out", "bg-blue-600", "border", "border-transparent", "rounded-md", "hover:bg-blue-500", "focus:outline-none", "focus:border-blue-700", "focus:shadow-outline-blue", "active:bg-blue-700", 3, "click"]],
  template: function MailAuthComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailAuthComponent_Template_button_click_2_listener() {
        return ctx.authenticate();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Click Here for Email Authentication ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
  },
  encapsulation: 2
});

/***/ }),

/***/ 949429:
/*!***********************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/details/details.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxDetailsComponent": () => (/* binding */ MailboxDetailsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/portal */ 984080);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mailbox.constants */ 150648);
/* harmony import */ var _details_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./details.store */ 421205);
/* harmony import */ var _mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mail-compose/mail-compose.component */ 443060);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../mailbox.service */ 652318);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/overlay */ 598184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _file_preview_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../file-preview/web-ui-file-preview.component */ 627718);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/expansion */ 49652);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ng-select/ng-select */ 477437);














// import { WebUiMailComposeComponent } from 'libs/web/ui/mail-compose/mail-compose.component';





















const _c0 = ["infoDetailsPanel"];
const _c1 = ["filePreviewModal"];
function MailboxDetailsComponent_mat_progress_bar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 5);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function MailboxDetailsComponent_ng_container_3_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25)(1, "div")(2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Legal Case");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 26)(5, "ng-select", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MailboxDetailsComponent_ng_container_3_div_5_Template_ng_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r14.legalCaseId = $event);
    })("change", function MailboxDetailsComponent_ng_container_3_div_5_Template_ng_select_change_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r16.onLegalCaseChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r6.classNames);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r6.legalCaseId)("items", ctx_r6.items)("clearable", true);
  }
}
function MailboxDetailsComponent_ng_container_3_button_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:tag");
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 30)(2, "mat-checkbox", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function MailboxDetailsComponent_ng_container_3_ng_container_10_Template_mat_checkbox_change_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19);
      const label_r17 = restoredCtx.$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r18.toggleLabel($event, label_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r17 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("checked", ctx_r9.mail.labels.includes(label_r17.id))("checked", ctx_r9.checked(label_r17))("disableRipple", true)("title", label_r17.display_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", label_r17.display_name, " ");
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_21_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", label_r21.display_name)("ngClass", ctx_r22.labelColors.blue.combined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", label_r21.display_name, " ");
  }
}
const _c2 = function () {
  return ["drafts", "spam", "trash", "sent", "inbox", "all"];
};
function MailboxDetailsComponent_ng_container_3_ng_container_21_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxDetailsComponent_ng_container_3_ng_container_21_ng_container_2_ng_container_1_Template, 3, 3, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c2).includes(label_r21.name));
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxDetailsComponent_ng_container_3_ng_container_21_ng_container_2_Template, 2, 2, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r11.mail.labels);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_ng_container_1_ng_container_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_ng_container_1_ng_container_1_span_3_Template, 2, 0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const toList_r35 = ctx_r39.$implicit;
    const i_r36 = ctx_r39.index;
    const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](toList_r35.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r36 < ctx_r37.totalToMail - 1 && i_r36 !== message_r24.to.length - 1);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_ng_container_1_ng_container_1_Template, 4, 2, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const i_r36 = ctx.index;
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r36 < ctx_r34.totalToMail);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_ng_container_1_Template, 2, 1, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", message_r24.to);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_1_ng_container_4_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_1_ng_container_4_span_3_Template, 2, 0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const from_r48 = ctx.$implicit;
    const i_r49 = ctx.index;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](from_r48.name + "<" + from_r48.email + ">");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r49 !== ctx_r47.selectedMsg.from.length - 1);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 57)(1, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "from:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_1_ng_container_4_Template, 4, 2, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r43.selectedMsg.from);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_2_ng_container_4_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_2_ng_container_4_span_3_Template, 2, 0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const to_r52 = ctx.$implicit;
    const i_r53 = ctx.index;
    const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](to_r52.name + "<" + to_r52.email + ">");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r53 !== ctx_r51.selectedMsg.to.length - 1);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 57)(1, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "to:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_2_ng_container_4_Template, 4, 2, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r44.selectedMsg.to);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_3_ng_container_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_3_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_3_ng_container_5_span_3_Template, 2, 0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const cc_r56 = ctx.$implicit;
    const i_r57 = ctx.index;
    const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](cc_r56.name + "<" + cc_r56.email + ">");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r57 !== ctx_r55.selectedMsg.cc.length - 1);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 57)(2, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "cc:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_3_ng_container_5_Template, 4, 2, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r45.selectedMsg.cc);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_4_ng_container_6_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_4_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_4_ng_container_6_span_3_Template, 2, 0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const bcc_r60 = ctx.$implicit;
    const i_r61 = ctx.index;
    const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](bcc_r60.name + "<" + bcc_r60.email + ">");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r61 !== ctx_r59.selectedMsg.bcc.length - 1);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 57)(2, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "bcc:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 59)(5, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_4_ng_container_6_Template, 4, 2, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r46.selectedMsg.bcc);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_1_Template, 5, 1, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_div_2_Template, 5, 1, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_3_Template, 6, 1, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_ng_container_4_Template, 7, 1, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 57)(6, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "date:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 57)(12, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "subject:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r29.selectedMsg.from && ctx_r29.selectedMsg.from.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r29.selectedMsg.to && ctx_r29.selectedMsg.to.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r29.selectedMsg.cc && ctx_r29.selectedMsg.cc.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r29.selectedMsg.bcc && ctx_r29.selectedMsg.bcc.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](10, 6, ctx_r29.selectedMsg.date * 1000, "EEEE, MMMM d, y - hh:mm a"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r29.selectedMsg.subject);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 70)(1, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const attachment_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", attachment_r64.filename.split(".").at(-1).trim().toUpperCase(), " ");
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 70)(1, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " FILE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_div_2_Template, 3, 1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_ng_template_3_Template, 3, 0, "ng-template", null, 66, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 67)(6, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_Template_div_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r70);
      const attachment_r64 = restoredCtx.$implicit;
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r69.filePreview(attachment_r64));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const attachment_r64 = ctx.$implicit;
    const _r66 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", attachment_r64.filename.includes("."))("ngIfElse", _r66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", attachment_r64.filename ? attachment_r64.filename : "File");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", attachment_r64.filename ? attachment_r64.filename : "File", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](10, 5, attachment_r64.size / 1000, "1.0-2"), " KB ");
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 60)(2, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_ng_container_7_Template, 11, 8, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:paper-clip");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", message_r24.files.length, " Attachments");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", message_r24.files);
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r75 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_button_6_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r75);
      const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r73.replyAll(message_r24));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Reply All");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:reply");
  }
}
function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r78 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 72)(2, "button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r78);
      const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r76.reply(message_r24));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Reply");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_button_6_Template, 4, 2, "button", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r78);
      const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r79.forward(message_r24));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-icon", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:reply");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (message_r24 == null ? null : message_r24.to == null ? null : message_r24.to.length) > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("svgIcon", "heroicons_solid:chevron-double-right");
  }
}
const _c3 = function (a0) {
  return {
    "text-orange-500 dark:text-orange-400": a0
  };
};
const _c4 = function (a0) {
  return {
    data: a0,
    isThread: false
  };
};
const _c5 = function (a0) {
  return {
    obj: a0
  };
};
function MailboxDetailsComponent_ng_container_3_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-expansion-panel", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("opened", function MailboxDetailsComponent_ng_container_3_ng_container_23_Template_mat_expansion_panel_opened_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r82.panelOpenState = true);
    })("closed", function MailboxDetailsComponent_ng_container_3_ng_container_23_Template_mat_expansion_panel_closed_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);
      const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r84.panelOpenState = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-expansion-panel-header", 36, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_Template_mat_expansion_panel_header_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);
      const i_r25 = restoredCtx.index;
      const message_r24 = restoredCtx.$implicit;
      const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r85.matHeaderClick(_r26, i_r25, message_r24.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-panel-title")(5, "div", 38)(6, "div", 38)(7, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 41)(12, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 43)(15, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "to");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_18_Template, 2, 1, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_Template_button_click_19_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);
      const message_r24 = restoredCtx.$implicit;
      const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      ctx_r86.openInfoDetailsPanel(message_r24);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_template_21_Template, 16, 9, "ng-template", null, 47, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 48)(24, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_Template_button_click_24_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);
      const message_r24 = restoredCtx.$implicit;
      const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      ctx_r87.toggleStar(false, message_r24.id);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_ng_container_23_Template_button_click_26_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-menu", null, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](30, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "mat-expansion-panel-body")(32, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_34_Template, 8, 3, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "ui-file-preview", 52, 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, MailboxDetailsComponent_ng_container_3_ng_container_23_ng_container_39_Template, 11, 6, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r24 = ctx.$implicit;
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](29);
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("expanded", ctx_r12.expandedMsgIds.includes(message_r24.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", message_r24.from[0] == null ? null : message_r24.from[0].name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r24.from[0].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", message_r24.to && message_r24.to.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "infoPanel" + message_r24.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:chevron-down");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", message_r24.starred ? "Starred" : "Not Starred");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c3, message_r24.starred))("svgIcon", message_r24.starred ? "heroicons_solid:star" : "heroicons_outline:star");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:dots-vertical");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](21, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](19, _c4, message_r24)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r12.safeHTML(message_r24.body), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", message_r24.files && message_r24.files.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isDownloadable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r12.replyFormActive);
  }
}
const _c6 = function () {
  return ["./"];
};
const _c7 = function (a0) {
  return {
    data: a0,
    isThread: true
  };
};
function MailboxDetailsComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r90 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6)(2, "div", 7)(3, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MailboxDetailsComponent_ng_container_3_div_5_Template, 7, 5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MailboxDetailsComponent_ng_container_3_button_7_Template, 2, 2, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-menu", null, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, MailboxDetailsComponent_ng_container_3_ng_container_10_Template, 5, 6, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_container_3_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r90);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r89.toggleStar(true, ctx_r89.mail.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-menu", null, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](17, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 20)(19, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, MailboxDetailsComponent_ng_container_3_ng_container_21_Template, 3, 1, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, MailboxDetailsComponent_ng_container_3_ng_container_23_Template, 40, 23, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](16);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c6));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1._mailboxService.getLegalCaseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1._mailboxService.getLegalCaseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.labels)("ngForTrackBy", ctx_r1.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx_r1.mail.starred ? "Starred" : "Not Starred");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c3, ctx_r1.mail.starred))("svgIcon", ctx_r1.mail.starred ? "heroicons_solid:star" : "heroicons_outline:star");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:dots-vertical");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](21, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](19, _c7, ctx_r1.mail)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.mail.subject);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.mail.labels && ctx_r1.mail.labels.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.mail.messages);
  }
}
function MailboxDetailsComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Select a mail to read");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:mailbox_empty");
  }
}
function MailboxDetailsComponent_ng_template_6_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r99 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_template_6_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r99);
      const obj_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().obj;
      const ctx_r97 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r97.toggleUnread(obj_r91.isThread, obj_r91.data.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Mark as unread");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:mail");
  }
}
function MailboxDetailsComponent_ng_template_6_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r102 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_template_6_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r102);
      const obj_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().obj;
      const ctx_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r100.toggleSpam(obj_r91.isThread, obj_r91.data.id, true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Spam");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:exclamation");
  }
}
function MailboxDetailsComponent_ng_template_6_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r105 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_template_6_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r105);
      const obj_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().obj;
      const ctx_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r103.toggleSpam(obj_r91.isThread, obj_r91.data.id, false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Not spam");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:exclamation");
  }
}
function MailboxDetailsComponent_ng_template_6_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r108 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_template_6_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r108);
      const obj_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().obj;
      const ctx_r106 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r106.toggleTrash(obj_r91.isThread, obj_r91.data.id, true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:trash");
  }
}
function MailboxDetailsComponent_ng_template_6_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r111 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxDetailsComponent_ng_template_6_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r111);
      const obj_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().obj;
      const ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r109.toggleTrash(obj_r91.isThread, obj_r91.data.id, false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Move to inbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:inbox");
  }
}
function MailboxDetailsComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MailboxDetailsComponent_ng_template_6_button_0_Template, 4, 1, "button", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxDetailsComponent_ng_template_6_button_1_Template, 4, 1, "button", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxDetailsComponent_ng_template_6_button_2_Template, 4, 1, "button", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_template_6_button_3_Template, 4, 1, "button", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxDetailsComponent_ng_template_6_button_4_Template, 4, 1, "button", 80);
  }
  if (rf & 2) {
    const obj_r91 = ctx.obj;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !obj_r91.data.unread);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !obj_r91.data.labelNames.includes("spam") && !obj_r91.data.labelNames.includes("drafts"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", obj_r91.data.labelNames.includes("spam"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !obj_r91.data.labelNames.includes("trash"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", obj_r91.data.labelNames.includes("trash"));
  }
}
class MailboxDetailsComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _elementRef, _mailboxService, _overlay, _router, _viewContainerRef, store, sanitized, toast, _matDialog, datePipe) {
    this._activatedRoute = _activatedRoute;
    this._elementRef = _elementRef;
    this._mailboxService = _mailboxService;
    this._overlay = _overlay;
    this._router = _router;
    this._viewContainerRef = _viewContainerRef;
    this.store = store;
    this.sanitized = sanitized;
    this.toast = toast;
    this._matDialog = _matDialog;
    this.datePipe = datePipe;
    this.replyFormActive = false;
    this.totalToMail = 4;
    this.expandedMsgIds = [];
    this.vm$ = this.store.vm$;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.items = [];
    this.legalCaseId = null;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.vm$.subscribe(data => {
      var _a, _b;
      if (data.mail) {
        if (data.mail.to && data.mail.to.length > 0) {
          data.mail.to.forEach(element => {
            if (element.email == this._mailboxService.email) {
              element.name = 'me';
            }
          });
        }
        this._mailboxService.readMail.next(data.mail.id);
        this.legalCaseId = ((_b = (_a = data.mail) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.legalCaseId) ? data.mail.metadata.legalCaseId : null;
      }
      this.mail = data.mail;
      if (this.mail && this.mail.messages.length > 0) {
        this.expandedMsgIds.push(this.mail.messages[this.mail.messages.length - 1].id);
      }
      this.legalCaseId = this.getLegalCaseIdFromMail();
    });
    // Get the label colors
    this.labelColors = _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.labelColorDefs;
    // Folders
    this._mailboxService.folders$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(folders => {
      this.folders = folders;
    });
    // Labels
    this._mailboxService.labels$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(labels => {
      this.labels = labels;
    });
    // Mail
    // this._mailboxService.mail$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((mail: Mail) => {
    //         console.log(mail);
    //         // this.mail = mail;
    //     });
    // Selected mail changed
    this._mailboxService.selectedMailChanged.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(() => {
      // De-activate the reply form
      this.replyFormActive = false;
    });
    this.getLegalCases();
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
   * Move to folder
   *
   * @param folderSlug
   */
  moveToFolder(folderSlug) {
    // Find the folder details
    const folder = this.folders.find(item => item.slug === folderSlug);
    // Return if the current folder of the mail
    // is already equals to the given folder
    if (this.mail.folder === folder.id) {
      return;
    }
    // Update the mail object
    this.mail.folder = folder.id;
    // Update the mail on the server
    this._mailboxService.updateMail(this.mail.id, {
      folder: this.mail.folder
    }).subscribe();
    // Navigate to the parent
    this._router.navigate(['./'], {
      relativeTo: this._activatedRoute.parent
    });
  }
  /**
   * Toggle label
   *
   * @param label
   */
  toggleLabel(event, label) {
    if (event.checked) {
      this._mailboxService.assignLabel(label.id, this.mail.id).subscribe(() => {
        this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
        const message = 'Conversation added to "' + label.display_name + '"';
        this.toast.success(message);
      });
    } else {
      this._mailboxService.unAssignLabel(label.id, this.mail.id).subscribe(() => {
        const labelId = this._activatedRoute.snapshot.paramMap.get('label');
        const message = 'Conversation removed from "' + label.display_name + '"';
        this.toast.success(message);
        if (labelId && labelId === label.id) {
          this._router.navigate(['./'], {
            relativeTo: this._activatedRoute.parent
          });
          return;
        }
        this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
      });
    }
  }
  /**
   * Toggle important
   */
  toggleImportant() {
    // Update the mail object
    this.mail.important = !this.mail.important;
    // Update the mail on the server
    this._mailboxService.updateMail(this.mail.id, {
      important: this.mail.important
    }).subscribe();
    // If the important was removed...
    if (!this.mail.important) {
      // If the current activated route has a filter parameter and it equals to the 'important'...
      if (this._activatedRoute.snapshot.paramMap.get('filter') && this._activatedRoute.snapshot.paramMap.get('filter') === 'important') {
        // Navigate to the parent
        this._router.navigate(['./'], {
          relativeTo: this._activatedRoute.parent
        });
      }
    }
  }
  /**
   * Toggle star
   */
  toggleStar(isThread = true, id) {
    var _a;
    const isFolder = this._activatedRoute.snapshot.paramMap.get('folder') ? true : false;
    const page = (_a = this._activatedRoute.snapshot.paramMap.get('page')) !== null && _a !== void 0 ? _a : '1';
    this._mailboxService.toggleStar(isThread, id).subscribe(() => {
      if (this._activatedRoute.snapshot.paramMap.get('folder') && this._activatedRoute.snapshot.paramMap.get('folder') === 'starred') {
        this._router.navigate(['./'], {
          relativeTo: this._activatedRoute.parent
        });
      } else {
        this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
        isFolder ? this._mailboxService.getMailsByFolder(this._activatedRoute.snapshot.paramMap.get('folder'), page).subscribe() : this._mailboxService.getMailsByLabel(this._activatedRoute.snapshot.paramMap.get('label'), page).subscribe();
      }
    });
  }
  /**
   * Toggle unread
   *
   * @param unread
   */
  toggleUnread(isThread = true, id) {
    this._mailboxService.toggleUnread(isThread, id).subscribe(() => {
      this._router.navigate(['./'], {
        relativeTo: this._activatedRoute.parent
      });
    });
  }
  toggleSpam(isThread = true, id, markSpam) {
    var _a;
    const page = (_a = this._activatedRoute.snapshot.paramMap.get('page')) !== null && _a !== void 0 ? _a : '1';
    this._mailboxService.toggleSpam(isThread, id, markSpam).subscribe(() => {
      if (this._activatedRoute.snapshot.paramMap.get('folder') && this._activatedRoute.snapshot.paramMap.get('folder') === 'all') {
        this._mailboxService.getMailsByFolder('all', page).subscribe();
        this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
      } else {
        this._router.navigate(['./'], {
          relativeTo: this._activatedRoute.parent
        });
      }
      const message = markSpam ? 'Conversation marked as "Spam"' : 'Conversation moved to "Inbox"';
      this.toast.success(message);
    });
  }
  toggleTrash(isThread = true, id, moveToTrash) {
    var _a;
    const page = (_a = this._activatedRoute.snapshot.paramMap.get('page')) !== null && _a !== void 0 ? _a : '1';
    this._mailboxService.toggleTrash(isThread, id, moveToTrash).subscribe(() => {
      /* if(this._activatedRoute.snapshot.paramMap.get('folder') && this._activatedRoute.snapshot.paramMap.get('folder') === 'all') {
          this._mailboxService.getMailsByFolder('all', page).subscribe();
          this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
      } else {
          this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
      } */
      this._router.navigate(['./'], {
        relativeTo: this._activatedRoute.parent
      });
      const message = moveToTrash ? 'Conversation moved to "Trash"' : 'Action completed';
      this.toast.success(message);
    });
  }
  filePreview(attachment) {
    this._mailboxService.getFile(attachment.id).subscribe(res => {
      var _a, _b, _c;
      if (res) {
        const base64 = `data: ${attachment.content_type} ;base64,` + ((_a = res.file) === null || _a === void 0 ? void 0 : _a.body);
        const obj = {
          attachment: base64,
          extension: attachment.content_type,
          name: (_b = attachment.filename) !== null && _b !== void 0 ? _b : 'File',
          size: attachment.size
        };
        (_c = this.filePreviewComponent) === null || _c === void 0 ? void 0 : _c.document.next(obj);
      }
    });
  }
  downloadFile(attachment) {
    var _a;
    const fileName = (_a = attachment.filename) !== null && _a !== void 0 ? _a : 'File';
    this._mailboxService.getFile(attachment.id).subscribe(res => {
      var _a;
      if (res) {
        const documentLink = document.createElement('a');
        document.body.appendChild(documentLink);
        documentLink.setAttribute('style', 'display: none');
        documentLink.href = `data: ${attachment.content_type} ;base64,` + ((_a = res.file) === null || _a === void 0 ? void 0 : _a.body);
        documentLink.download = fileName;
        documentLink.click();
      }
    });
  }
  /**
   * Reply
   */
  getLegalCaseIdFromMail() {
    var _a;
    return (_a = this.mail) === null || _a === void 0 ? void 0 : _a.messages.filter(msg => {
      var _a;
      return (_a = msg === null || msg === void 0 ? void 0 : msg.metadata) === null || _a === void 0 ? void 0 : _a.legalCaseId;
    }).map(ele => ele.metadata.legalCaseId)[0];
  }
  reply(mail) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
      const currentEmail = this._mailboxService.email;
      const mailObj = Object.assign({}, mail);
      mailObj.cc = [];
      mailObj.bcc = [];
      if (currentEmail !== mail.from[0].email) {
        mailObj.to = mail.from;
      }
      mailObj.body = yield this.setBodyForReply(mail);
      mailObj.subject = yield this.setSubjectForReply(mail);
      /* open model and fill the values */
      const dialogRef = this._matDialog.open(_mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_5__.WebUiMailComposeComponent, {
        data: {
          token: this._mailboxService.token,
          mail: mailObj,
          mailAction: _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.MailAction.reply,
          legalCaseId: this.legalCaseId
        }
      });
      dialogRef.componentInstance.isClose$.subscribe(res => {
        if (res) {
          dialogRef.close();
          if (!res.cancel) {
            this.reloadCurrentRoute();
          }
        }
      });
    });
  }
  /**
   * Reply all
   */
  replyAll(mail) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
      const mailObj = Object.assign({}, mail);
      const currentEmail = this._mailboxService.email;
      mailObj.bcc = [];
      if (currentEmail !== mail.from[0].email) {
        mailObj.to = mail.from;
        mailObj.cc = mail.to.concat(mail.cc);
      }
      /* remove all to ids and current mail id from cc */
      let removeMailListFromCC = [];
      if (mailObj.to) {
        removeMailListFromCC = mailObj.to.map(m => m.email);
      }
      removeMailListFromCC.push(currentEmail);
      mailObj.cc = mailObj.cc.filter(f => !removeMailListFromCC.includes(f.email));
      mailObj.body = yield this.setBodyForReply(mail);
      mailObj.subject = mailObj.subject = yield this.setSubjectForReply(mail);
      /* open model and fill the values */
      const dialogRef = this._matDialog.open(_mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_5__.WebUiMailComposeComponent, {
        data: {
          token: this._mailboxService.token,
          mail: mailObj,
          mailAction: _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.MailAction.replyAll,
          legalCaseId: this.legalCaseId
        }
      });
      dialogRef.componentInstance.isClose$.subscribe(res => {
        if (res) {
          dialogRef.close();
          if (!res.cancel) {
            this.reloadCurrentRoute();
          }
          ;
        }
      });
    });
  }
  /**
   * Forward
   */
  forward(mail) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
      const mailObj = Object.assign({}, mail);
      mailObj.cc = [];
      mailObj.bcc = [];
      mailObj.to = [];
      mailObj.subject = [];
      mailObj.body = yield this.setBodyForForward(mail);
      mailObj.subject = yield this.setSubjectForForward(mail);
      /* open model and fill the values */
      const dialogRef = this._matDialog.open(_mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_5__.WebUiMailComposeComponent, {
        data: {
          token: this._mailboxService.token,
          mail: mailObj,
          mailAction: _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.MailAction.forward,
          legalCaseId: this.legalCaseId
        }
      });
      dialogRef.componentInstance.isClose$.subscribe(res => {
        if (res) {
          dialogRef.close();
          if (!res.cancel) {
            this.reloadCurrentRoute();
          }
        }
      });
    });
  }
  setSubjectForReply(mail) {
    return new Promise(resolve => {
      let subject = mail.subject.includes('Re:') ? mail.subject : 'Re: ' + mail.subject;
      if (subject.includes('Re: Fwd:')) {
        subject = subject.replace('Re: Fwd:', 'Re: ');
      }
      resolve(subject);
    });
  }
  setSubjectForForward(mail) {
    return new Promise(resolve => {
      let subject = mail.subject.includes('Fwd:') ? mail.subject : 'Fwd: ' + mail.subject;
      if (subject.includes('Fwd: Re:')) {
        subject = subject.replace('Fwd: Re:', 'Fwd: ');
      }
      resolve(subject);
    });
  }
  setBodyForForward(mail) {
    return new Promise(resolve => {
      // const blankSpace = '<br><br>'
      const forwardMsg = `<div class="gmail_quote"><div dir="ltr" class="gmail_attr">---------- Forwarded message ---------<br>`;
      const from = `From: <strong class="gmail_sendername" dir="auto">${mail.from[0].name}</strong> <span dir="auto">&lt;${this.mailAnchorTag(mail.from[0].email)}&gt;</span><br>`;
      const date = `Date: ${this.datePipe.transform(mail.date * 1000, 'EEE, d MMM y') + ' at ' + this.datePipe.transform(mail.date * 1000, 'HH:mm')}<br>`;
      const subject = `Subject: ${mail.subject}<br>`;
      const to = mail.to.length > 0 ? `To: ${this.stringReturn(mail.to)} <br>` : ``;
      const cc = mail.cc.length > 0 ? `Cc: ${this.stringReturn(mail.cc)} <br>` : ``;
      const other = `</div><br><br>${mail.body}</div>`;
      resolve(forwardMsg + from + date + subject + to + cc + other);
    });
  }
  mailAnchorTag(mail) {
    return `<a href="mailto:${mail}" target="_blank">${mail}</a>`;
  }
  setBodyForReply(mail) {
    return new Promise(resolve => {
      // const blankSpace = '<div dir="ltr" gmail_original="1"><br></div><br>'
      const date = this.datePipe.transform(mail.date * 1000, 'EEE, d MMM y') + ' at ' + this.datePipe.transform(mail.date * 1000, 'HH:mm');
      const mailAnchor = this.mailAnchorTag(mail.from[0].email);
      const text = `<div class="gmail_quote"><div dir="ltr" class="gmail_attr">On ${date}, ${mail.from[0].name} &lt;${mailAnchor}&gt; wrote:<br></div>`;
      const blockQuote = `<blockquote class="gmail_quote" style="margin: 0px 0px 0px 0.8ex; border-left: 1px solid rgb(204, 204, 204); padding-left: 1ex;">${mail.body}</blockquote></div>`;
      resolve(text + blockQuote);
    });
  }
  stringReturn(array) {
    let text = '';
    array.forEach((element, index) => {
      text += `${element.name}&lt;${this.mailAnchorTag(element.email)}&gt;${index !== array.length - 1 ? '&comma;' : ''} `;
    });
    return text;
  }
  reloadCurrentRoute() {
    var _a;
    const isFolder = this._activatedRoute.snapshot.paramMap.get('folder') ? true : false;
    const page = (_a = this._activatedRoute.snapshot.paramMap.get('page')) !== null && _a !== void 0 ? _a : '1';
    this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
    isFolder ? this._mailboxService.getMailsByFolder(this._activatedRoute.snapshot.paramMap.get('folder'), page).subscribe() : this._mailboxService.getMailsByLabel(this._activatedRoute.snapshot.paramMap.get('label'), page).subscribe();
  }
  /**
   * Discard
   */
  discard() {
    // Deactivate the reply form
    this.replyFormActive = false;
  }
  /**
   * Send
   */
  send() {
    // Deactivate the reply form
    this.replyFormActive = false;
  }
  /**
   * Open info details panel
   */
  openInfoDetailsPanel(selectedMsg) {
    this.selectedMsg = selectedMsg;
    // Create the overlay
    this._overlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._elementRef.nativeElement.querySelector('#infoPanel' + selectedMsg.id)).withFlexibleDimensions(true).withViewportMargin(16).withLockedPosition(true).withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }, {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
      }])
    });
    // Create a portal from the template
    const templatePortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__.TemplatePortal(this._infoDetailsPanel, this._viewContainerRef);
    // Attach the portal to the overlay
    this._overlayRef.attach(templatePortal);
    // Subscribe to the backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
      // If overlay exists and attached...
      if (this._overlayRef && this._overlayRef.hasAttached()) {
        // Detach it
        this._overlayRef.detach();
      }
      // If template portal exists and attached...
      if (templatePortal && templatePortal.isAttached) {
        // Detach it
        templatePortal.detach();
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
  safeHTML(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
  checked(label) {
    return this.mail.labels.find(f => f.id == label.id);
  }
  matHeaderClick(panelH, i, msgId) {
    if (i === this.mail.messages.length - 1) {
      panelH._toggle();
    } else {
      panelH.panel._expanded ? this.expandedMsgIds.push(msgId) : this.expandedMsgIds.splice(this.expandedMsgIds.indexOf(msgId), 1);
      return;
    }
  }
  getLegalCases() {
    this._mailboxService.getLegalCases().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.take)(1)).subscribe({
      next: res => {
        this.items = res.data.items;
      },
      error: err => {
        this.items = [];
      }
    });
  }
  onLegalCaseChange(event) {
    var _a, _b, _c;
    let legalCaseId = (event === null || event === void 0 ? void 0 : event.id) ? event.id : null;
    let msgIds = ((_b = (_a = this.mail) === null || _a === void 0 ? void 0 : _a.message_ids) === null || _b === void 0 ? void 0 : _b.length) ? (_c = this.mail) === null || _c === void 0 ? void 0 : _c.message_ids : [];
    this._mailboxService.updateMessageByIds(legalCaseId, msgIds).subscribe(() => {
      this._router.navigate(['./'], {
        relativeTo: this._activatedRoute.parent
      });
    });
  }
  get classNames() {
    const classes = 'custom block w-full text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md';
    return classes;
  }
}
MailboxDetailsComponent.ɵfac = function MailboxDetailsComponent_Factory(t) {
  return new (t || MailboxDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_9__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_details_store__WEBPACK_IMPORTED_MODULE_11__.MailboxDetailsStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_13__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_15__.DatePipe));
};
MailboxDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MailboxDetailsComponent,
  selectors: [["mailbox-details"]],
  viewQuery: function MailboxDetailsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._infoDetailsPanel = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.filePreviewComponent = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_details_store__WEBPACK_IMPORTED_MODULE_11__.MailboxDetailsStore])],
  decls: 8,
  vars: 5,
  consts: [[1, "flex", "flex-col", "flex-auto", "overflow-y-auto", "lg:overflow-hidden", "bg-card", "dark:bg-default"], ["class", "absolute inset-x-0 top-0 h-0.5 z-20", 3, "mode", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["selectMailToRead", ""], ["matMenuContainer", ""], [1, "absolute", "inset-x-0", "top-0", "h-0.5", "z-20", 3, "mode"], [1, "z-10", "relative", "flex", "flex-col", "flex-0", "w-full", "border-b"], [1, "flex", "items-center", "min-h-16", "px-4", "md:px-6", "border-b", "bg-gray-50", "dark:bg-transparent"], ["mat-icon-button", "", 1, "lg:hidden", "md:-ml-2", 3, "routerLink"], [3, "svgIcon"], ["class", "flex items-center w-1/2 legal-case-dropdown", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-auto", "mat-icon-button", "", "title", "Labels", 3, "matMenuTriggerFor", 4, "ngIf"], ["toggleLabelMenu", "matMenu"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["mat-icon-button", "", 1, "ml-2", 3, "title", "click"], [3, "ngClass", "svgIcon"], ["mat-icon-button", "", 1, "ml-2", 3, "matMenuTriggerFor"], ["mailMenu", "matMenu"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "flex", "flex-wrap", "items-center", "py-5", "px-6"], [1, "flex", "flex-auto", "my-1", "mr-4", "text-2xl"], [4, "ngIf"], ["fuseScrollReset", "", 1, "flex", "flex-col", "flex-auto", "shrink-0", "lg:shrink", "p-3", "lg:overflow-y-auto", "bg-gray-100", "dark:bg-transparent"], [4, "ngFor", "ngForOf"], [1, "flex", "items-center", "w-1/2", "legal-case-dropdown"], [1, "pl-3", "w-1/2"], ["bindLabel", "name", "bindValue", "id", 3, "ngModel", "items", "clearable", "ngModelChange", "change"], ["dropdown", ""], ["mat-icon-button", "", "title", "Labels", 1, "ml-auto", 3, "matMenuTriggerFor"], ["mat-menu-item", ""], [3, "color", "checked", "disableRipple", "title", "change"], [1, "truncate", "w-60"], [1, "flex", "flex-wrap", "items-center", "justify-start", "-mx-1"], [1, "m-1", "py-0.5", "px-2.5", "rounded-full", "text-sm", "font-medium", "whitespace-nowrap", "truncate", "max-w-36", 3, "title", "ngClass"], ["hideToggle", "", 1, "flex", "flex-col", "flex-0", "w-full", "shadow", "rounded-2xl", "overflow-hidden", "bg-card", "dark:bg-black", "dark:bg-opacity-10", "mb-5", 3, "expanded", "opened", "closed"], [3, "click"], ["panelH", ""], [1, "flex", "items-center", "w-full"], [1, "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "overflow-hidden"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "ml-4", "min-w-0"], [1, "font-semibold", "truncate"], [1, "flex", "items-center", "mt-0.5", "leading-5"], [1, "ml-1", "font-semibold"], ["mat-icon-button", "", 1, "w-5", "h-5", "min-h-5", "ml-1", 3, "id", "click"], [1, "icon-size-5", 3, "svgIcon"], ["infoDetailsPanel", ""], [1, "flex", "flex-0"], ["mat-icon-button", "", 1, "ml-2", 3, "matMenuTriggerFor", "click"], [1, "flex", "flex-col", "py-8", "px-6"], [3, "innerHTML"], ["mode", "edit", 3, "isDownloadable"], ["filePreviewModal", ""], [1, "flex", "w-full", "p-6", "border-t", "bg-gray-50", "dark:bg-transparent"], [1, "flex", "flex-col", "py-4", "px-6", "w-full", "max-w-160", "space-y-1.5", "border", "text-md", "rounded", "shadow-md", "overflow-auto", "bg-card"], ["class", "flex", 4, "ngIf"], [1, "flex"], [1, "min-w-14", "font-medium", "text-right"], [1, "pl-2", "whitespace-pre-wrap"], [1, "flex", "flex-col", "w-full"], [1, "flex", "items-center", "mt-12"], [1, "ml-2", "font-semibold"], [1, "flex", "flex-wrap", "-m-3", "mt-3"], [1, "flex", "items-center", "m-3"], ["class", "flex items-center justify-center w-10 h-10 rounded-md overflow-hidden bg-primary-100", 4, "ngIf", "ngIfElse"], ["fileExtension", ""], [1, "ml-3"], [1, "text-md", "text-left", "font-medium", "truncate", "w-30", "cursor-pointer", 3, "title", "click"], [1, "text-sm", "font-medium", "truncate", "text-secondary"], [1, "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-md", "overflow-hidden", "bg-primary-100"], [1, "flex", "items-center", "justify-center", "text-sm", "font-semibold", "text-primary-500-800"], [1, "flex", "flex-wrap", "w-full", "-m-2"], ["mat-stroked-button", "", 1, "m-2", 3, "color", "click"], [1, "ml-2"], ["class", "m-2", "mat-stroked-button", "", 3, "color", "click", 4, "ngIf"], [1, "icon-size-5", 3, "color", "svgIcon"], [1, "flex", "flex-col", "flex-auto", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], [1, "icon-size-24", 3, "svgIcon"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"], ["mat-menu-item", "", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 3, "click"]],
  template: function MailboxDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxDetailsComponent_mat_progress_bar_1_Template, 1, 1, "mat-progress-bar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxDetailsComponent_ng_container_3_Template, 24, 23, "ng-container", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxDetailsComponent_ng_template_4_Template, 4, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MailboxDetailsComponent_ng_template_6_Template, 5, 5, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 3, ctx._mailboxService.mailDetailLoading$));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mail)("ngIfElse", _r2);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatIconAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__.MatCheckbox, _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__.MatMenuTrigger, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__.MatProgressBar, _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_21__.FuseScrollResetDirective, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgTemplateOutlet, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgModel, _file_preview_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_23__.WebUiFilePreviewComponent, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_24__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_24__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_24__.MatExpansionPanelTitle, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_25__.NgSelectComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DatePipe],
  styles: [".mat-expansion-panel-body {\n  padding: 0px 0px 0px !important;\n}\n\n.mat-expansion-panel-header {\n  padding: 15px 15px !important;\n}\n\n.mat-expansion-panel-header-title {\n  display: block !important;\n}\n\n.mat-expansion-panel-header.mat-expanded, .mat-expansion-panel-header {\n  height: unset;\n}"],
  encapsulation: 2
});

/***/ }),

/***/ 421205:
/*!*******************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/details/details.store.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxDetailsStore": () => (/* binding */ MailboxDetailsStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mailbox.service */ 652318);




class MailboxDetailsStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(_mailboxService) {
    super({
      loading: false
    });
    this._mailboxService = _mailboxService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.mail$ = this.select(s => s.mail);
    this.vm$ = this.select(this.errors$, this.loading$, this.mail$, (errors, loading, mail) => ({
      errors,
      loading,
      mail
    }), {
      debounce: true
    });
    this._mailboxService.mail$.subscribe(data => {
      this.patchState({
        mail: data
      });
    });
  }
}
MailboxDetailsStore.ɵfac = function MailboxDetailsStore_Factory(t) {
  return new (t || MailboxDetailsStore)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_2__.MailboxService));
};
MailboxDetailsStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: MailboxDetailsStore,
  factory: MailboxDetailsStore.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 627718:
/*!****************************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/file-preview/web-ui-file-preview.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KEY_CODE": () => (/* binding */ KEY_CODE),
/* harmony export */   "WebUiFilePreviewComponent": () => (/* binding */ WebUiFilePreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var libs_core_feature_src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/core/feature/src/environments/environment */ 984165);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-extended-pdf-viewer */ 803930);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 397392);







// import { WebUiToastService } from '../toast/src'
// import { WebUiToastService } from '../../..'
// import { Document } from '@case-clinical/api/document/data-access/'













const _c0 = ["documentTpl"];
function WebUiFilePreviewComponent_ng_container_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "a", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_0_div_2_Template_a_click_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const file_r9 = restoredCtx.$implicit;
      const i_r10 = restoredCtx.index;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r12.openDocument(file_r9, $event, i_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", file_r9 == null ? null : file_r9.name)("formControl", ctx_r8.formControl)("formlyAttributes", ctx_r8.field)("matTooltip", file_r9 == null ? null : file_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r8.getAbbrName(file_r9 == null ? null : file_r9.name), " ");
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
function WebUiFilePreviewComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "a", 7, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_1_Template_a_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r15.openDocument(ctx_r15.documents[0], $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", ctx_r1.documents[0] == null ? null : ctx_r1.documents[0].name)("matTooltip", ctx_r1.documents[0] == null ? null : ctx_r1.documents[0].name);
  }
}
function WebUiFilePreviewComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "a", 7, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_2_Template_a_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r18.openDocument(ctx_r18.documents[0], $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", ctx_r2.documents[0] == null ? null : ctx_r2.documents[0].name)("matTooltip", ctx_r2.documents[0] == null ? null : ctx_r2.documents[0].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
  }
}
function WebUiFilePreviewComponent_ng_container_3_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const doc_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-image", "url(" + doc_r23.attachment + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", doc_r23.attachment, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_3_ng_container_1_div_1_Template, 2, 3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r23 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r23.extension.split("/")[0] === "image");
  }
}
function WebUiFilePreviewComponent_ng_container_3_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r22.loadingText, " ");
  }
}
function WebUiFilePreviewComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_3_ng_container_1_Template, 2, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiFilePreviewComponent_ng_container_3_ng_template_3_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r3.avatarImage))("ngIfElse", _r21);
  }
}
function WebUiFilePreviewComponent_ng_container_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "a", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_4_div_2_Template_a_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r28.openDocument(ctx_r28.documents, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", ctx_r26.documents == null ? null : ctx_r26.documents.name)("formControl", ctx_r26.formControl)("formlyAttributes", ctx_r26.field)("matTooltip", ctx_r26.documents == null ? null : ctx_r26.documents.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r26.getAbbrName(ctx_r26.documents == null ? null : ctx_r26.documents.name), " ");
  }
}
function WebUiFilePreviewComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_4_div_2_Template, 4, 5, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.documents == null ? null : ctx_r4.documents.id);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ui_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_5_div_0_ui_button_6_Template_ui_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r40);
      const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r38.download(doc_r32));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-progress-bar", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 29)(4, "div", 30)(5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_1_iframe_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iframe", 32);
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", doc_r32.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeResourceUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_1_iframe_1_Template, 1, 1, "iframe", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r32.url);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 33)(2, "ngx-extended-pdf-viewer", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("progress", function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_1_Template_ngx_extended_pdf_viewer_progress_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r50);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r49.progressLog($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-progress-bar", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r46.loading ? "opacity-0" : "opacity-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("base64Src", ctx_r46.getDataUrl(doc_r32 == null ? null : doc_r32.attachment))("useBrowserLocale", true)("textLayer", false)("enableDragAndDrop", false)("showHandToolButton", true)("showOpenFileButton", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r46.loading ? "flex" : "hidden");
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 36)(2, "img", 37, 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("error", function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_2_Template_img_error_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55);
      const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r54.showDownloadOnError(_r52, _r53, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 39, 40)(6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "This image file cannot be previewed, click below to download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ui-button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_2_Template_ui_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55);
      const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r56.download(doc_r32));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r47.safeUrl(doc_r32.attachment), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 29)(2, "div", 30)(3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Only PDF, Image and DICOM Image view are supported for now.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Click below for download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ui-button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_3_Template_ui_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61);
      const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r59.download(doc_r32));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](doc_r32.name);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_1_Template, 5, 8, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_2_Template, 9, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_ng_container_3_Template, 10, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r32.extension === "application/pdf");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r32.extension && doc_r32.extension.split("/")[0] === "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r32.extension && doc_r32.extension !== "application/pdf" && doc_r32.extension.split("/")[0] !== "image");
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_1_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_ng_container_2_Template, 4, 3, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r32 && doc_r32.isDicom);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r32 && !doc_r32.isDicom);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r66 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 30)(1, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_5_div_0_div_11_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r66);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r65.nextPrevClick(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_5_div_0_div_11_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r66);
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r67.nextPrevClick(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "svg", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r37.selectedIndex == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r37.selectedIndex === (ctx_r37.documents == null ? null : ctx_r37.documents.length) - 1);
  }
}
function WebUiFilePreviewComponent_ng_template_5_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18)(1, "div", 19)(2, "span", 20, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, WebUiFilePreviewComponent_ng_template_5_div_0_ui_button_6_Template, 1, 0, "ui-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ui-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_5_div_0_Template_ui_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r70);
      const ref_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ref_r30.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_9_Template, 7, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, WebUiFilePreviewComponent_ng_template_5_div_0_ng_container_10_Template, 3, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, WebUiFilePreviewComponent_ng_template_5_div_0_div_11_Template, 7, 2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const doc_r32 = ctx.ngIf;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", doc_r32 == null ? null : doc_r32.name == null ? null : doc_r32.name.split(".")[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r31.getAbbrName(doc_r32 == null ? null : doc_r32.name == null ? null : doc_r32.name.split(".")[0]));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r31.isDownloadable && (doc_r32 == null ? null : doc_r32.extension == null ? null : doc_r32.extension.split("/")[0]) === "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r31.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r31.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r31.documents == null ? null : ctx_r31.documents.length) > 1);
  }
}
function WebUiFilePreviewComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUiFilePreviewComponent_ng_template_5_div_0_Template, 12, 6, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx_r6.document));
  }
}
function WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 55)(2, "img", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_ng_container_9_Template_img_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r79);
      const i_r77 = restoredCtx.index;
      const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r78.setCurrent(i_r77));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const img_r76 = ctx.$implicit;
    const i_r77 = ctx.index;
    const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", i_r77 === ctx_r75.currentGalleryIndex ? "border border-blue-500" : "opacity-50");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r75.safeUrl(img_r76 == null ? null : img_r76.attachment), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r81 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 51)(2, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r81);
      const ctx_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r80.setPrevious());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r81);
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r82.setNext());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_ng_container_9_Template, 3, 2, "ng-container", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-image", "url(" + ctx_r72.getCurrentGallery() + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r72.galleryImages);
  }
}
function WebUiFilePreviewComponent_ng_container_7_div_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h4", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "No Images Uploaded");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiFilePreviewComponent_ng_container_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_7_div_1_ng_container_1_Template, 10, 3, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_7_div_1_ng_template_2_Template, 2, 0, "ng-template", null, 50, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r73 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r71.galleryImages.length > 0)("ngIfElse", _r73);
  }
}
function WebUiFilePreviewComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_7_div_1_Template, 4, 2, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r7.galleryImages);
  }
}
const _c1 = ".gallery-wrapper[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 50px;\n}\n\n.current-image-gallery[_ngcontent-%COMP%] {\n  background-position: center !important;\n  background-size: contain !important;\n  background-repeat: no-repeat !important;\n}\n\n.next-prev[_ngcontent-%COMP%]:disabled, .next-prev[disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n\n  .ngneat-dialog-content {\n  width: 100% !important;\n  height: 100% !important;\n}";
var KEY_CODE;
(function (KEY_CODE) {
  KEY_CODE[KEY_CODE["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
  KEY_CODE[KEY_CODE["LEFT_ARROW"] = 37] = "LEFT_ARROW";
})(KEY_CODE || (KEY_CODE = {}));
class WebUiFilePreviewComponent {
  getEventLog(data) {
    // console.log('event called' ,data)
  }
  keyEvent(event) {
    if (this.isDialogOpen) {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.nextPrevClick(true);
      }
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.nextPrevClick(false);
      }
    }
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
    this.isLoading = false;
    this.selectedIndex = 0;
    this.isDialogOpen = false;
    this._loading = false;
    this.currentGalleryIndex = 0;
    this.galleryImages = [];
    this.firstError = true;
    this.document.subscribe(doc => {
      // console.log(doc)
      if (!doc) return;
      if (doc && doc.isDicom) {
        if (!doc.url) {
          this.getDicomUrl(doc);
        } else {
          if (!this.isDialogOpen) {
            this.openDialog();
          }
        }
      } else {
        if (doc.attachment && doc.attachment != '') {
          if (!this.isDialogOpen) {
            this.openDialog();
          }
          this._loading = true;
        } else if (doc.id) {
          // its from server
          this.getDoc(doc.id);
        }
      }
    });
  }
  ngOnInit() {
    if (this.mode === 'avatar' && !Array.isArray(this.documents) && this.documents.__typename === 'Document' && this.documents.id) {
      // make sure its an avatar and a single upload Document object
      this.getDoc(this.documents.id, this.avatarImage);
    } else if (this.mode === 'gallery' && Array.isArray(this.documents) && this.documents.length > 0) {
      const docs = this.documents.filter(ele => {
        var _a;
        if (this.documents[0].id && ((_a = this.documents[0]) === null || _a === void 0 ? void 0 : _a.__typename) === 'Document') return true;
        return false;
      });
      this.getDocs(docs.map(ele => ele.id), this.fetchedDocs);
      console.log(this.fetchedDocs);
      this.fetchedDocs.subscribe(val => {
        this.galleryImages = val.filter(ele => {
          var _a;
          return ((_a = ele === null || ele === void 0 ? void 0 : ele.extension) === null || _a === void 0 ? void 0 : _a.split('/')[0]) === 'image';
        });
        if (this.galleryImages.length < 1) this.hideButtonEvent.emit(true);
        this.ref.detectChanges();
        console.log(this.galleryImages);
      });
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
  openDocument(file, e, index = 0) {
    this.selectedIndex = index;
    e.stopImmediatePropagation();
    this.document.next(file);
  }
  progressLog(e) {
    var _a;
    if (((_a = e === null || e === void 0 ? void 0 : e.source) === null || _a === void 0 ? void 0 : _a.downloadComplete) === false) {
      let int = setInterval(() => {
        var _a;
        if (((_a = e.source) === null || _a === void 0 ? void 0 : _a.downloadComplete) === true) {
          this._loading = false;
          clearInterval(int);
        }
      }, 150);
    }
  }
  openDialog(size = 'xxl') {
    const dialogRef = this.dialog.open(this.documentTpl, {
      size: size,
      resizable: false,
      closeButton: false
    });
    this.isDialogOpen = true;
    dialogRef.afterClosed$.subscribe(() => {
      this.isDialogOpen = false;
    });
  }
  closeDialog(e) {
    this.dialog.closeAll();
  }
  safeUrl(url) {
    return this.sanitized.bypassSecurityTrustUrl(url);
  }
  getDoc(documentId, customSubject) {
    this.isLoading = true;
    this.webData.getDocument(documentId).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__.tapResponse)(document => {
      if (customSubject) customSubject.next(document);else this.document.next(document);
      this.isLoading = false;
      this.destroy$.next(true);
    }, errors => {
      this.toast.error(errors.message || 'error while fetching data');
      this.isLoading = false;
      this.destroy$.next(true);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.destroy$)).subscribe();
  }
  getDicomUrl(doc) {
    const url = `${libs_core_feature_src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.dicom_base_url}viewer/${doc.dicomStudyId}?domain=${window.location.host.split('.')[0]}`;
    doc.url = this.sanitized.bypassSecurityTrustResourceUrl(url);
    this.document.next(doc);
  }
  getDocs(docIds, customSubject) {
    const temp = [];
    docIds.forEach(docId => {
      const destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
      this.webData.getDocument(docId).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__.tapResponse)(document => {
        temp.push(document);
        customSubject && customSubject.next(temp);
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
  nextPrevClick(isNext = true) {
    const nextPrevIndex = isNext ? this.selectedIndex + 1 : this.selectedIndex - 1;
    if (this.documents && this.documents[nextPrevIndex]) {
      const file = this.documents[nextPrevIndex];
      if (file && file.isDicom) {
        this.getDicomUrl(file);
      } else {
        this.getDoc(file.id);
      }
      this.document.next(file);
      this.selectedIndex = nextPrevIndex;
    } else {
      return;
    }
  }
  showError(e) {
    console.log(e);
  }
  showDownloadOnError(imgElement, containerElement, e) {
    // if(!this.firstError) return;
    imgElement.classList.add('hidden');
    containerElement.classList.remove('hidden');
    this.firstError = false;
  }
}
WebUiFilePreviewComponent.ɵfac = function WebUiFilePreviewComponent_Factory(t) {
  return new (t || WebUiFilePreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_6__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
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
  hostBindings: function WebUiFilePreviewComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function WebUiFilePreviewComponent_keyup_HostBindingHandler($event) {
        return ctx.keyEvent($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
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
  decls: 8,
  vars: 6,
  consts: [[4, "ngIf"], ["documentTpl", ""], [1, "flex", "flex-wrap", "gap-2", "items-stretch"], ["class", "rounded-xl p-2.5 bg-stone-200", 4, "ngFor", "ngForOf"], [1, "rounded-xl", "p-2.5", "bg-stone-200"], ["webUiFormFieldFile", "", "ngDefaultControl", "", 1, "text-blue-500", "no-underline", "hover:cursor-pointer", "break-all", 3, "download", "formControl", "formlyAttributes", "matTooltip", "click"], ["tooltip", "matTooltip"], ["webUiFormFieldFile", "", 1, "text-blue-500", "flex", "no-underline", "hover:cursor-pointer", "break-all", 3, "download", "matTooltip", "click"], ["svgIcon", "heroicons_outline:eye"], ["mat-flat-button", "", 3, "color"], [4, "ngIf", "ngIfElse"], ["whileLoading", ""], ["class", "h-full w-full center-image", 3, "backgroundImage", 4, "ngIf"], [1, "h-full", "w-full", "center-image"], [1, "h-full", "w-auto", 3, "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "overflow-hidden", "font-bold", "leading-none", "text-gray-600", "uppercase", "bg-gray-200", "rounded", "text-2xl", "dark:bg-gray-700", "dark:text-gray-200"], ["class", "rounded-xl p-2.5 bg-stone-200", 4, "ngIf"], ["class", "flex flex-col flex-grow overflow-hidden", 4, "ngIf"], [1, "flex", "flex-col", "flex-grow", "overflow-hidden"], [1, "flex", "justify-between", "px-3", "py-3"], [1, "text-xl", "font-bold", "truncate", 3, "matTooltip"], [1, "flex", "items-center", "gap-4"], ["label", "Download", "variant", "Default", 3, "click", 4, "ngIf"], ["label", "Close", "variant", "white", 3, "click"], [1, "flex-grow", "flex-shrink-0", "basis-200px", "basis", "relative", "overflow-y-auto"], ["class", "text-center", 4, "ngIf"], ["label", "Download", "variant", "Default", 3, "click"], [1, "w-full", "h-full", "absolute", "top-0", "left-0", "flex"], ["mode", "indeterminate"], [1, "flex", "items-center", "justify-center", 2, "width", "100%", "height", "100%"], [1, "text-center"], ["class", "h-full w-full", 3, "src", 4, "ngIf"], [1, "h-full", "w-full", 3, "src"], [1, "h-full", "w-full", 3, "ngClass"], [3, "base64Src", "useBrowserLocale", "textLayer", "enableDragAndDrop", "showHandToolButton", "showOpenFileButton", "progress"], [1, "w-full", "h-full", "absolute", "top-0", "left-0", 3, "ngClass"], [1, "overflow-x-auto", "flex", "h-full", "items-center", "justify-center"], ["alt", "Image from server", 1, "h-auto", "w-auto", "minImage", 3, "src", "error"], ["imgElement", ""], [1, "flex", "justify-center", "flex-col", "gap-4", "items-center", "hidden"], ["hiddenDownload", ""], ["label", "Download", "variant", "Default", 1, "mt-2", 3, "click"], [1, "mb-2"], [1, "mt-2"], [1, "next-prev", 3, "disabled", "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-10", "h-10"], ["fill-rule", "evenodd", "fill", "#3B82F6", "d", "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "fill", "#3B82F6", "d", "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z", "clip-rule", "evenodd"], ["class", "w-full my-4 mx-2", 4, "ngIf"], [1, "w-full", "my-4", "mx-2"], ["noImages", ""], [1, "w-full", "flex", "items-stretch", "justify-between", "current-image-gallery", "h-100", "transition-all"], [1, "px-4", 3, "click"], [1, "w-full", "flex", "flex-wrap", "justify-center", "gap-2", "items-center", "py-2", "px-4", "my-4"], [4, "ngFor", "ngForOf"], [1, "h-12", "transition-all", "rounded", "p-1", 3, "ngClass"], ["alt", "thumbnail", 1, "h-full", "w-auto", 3, "src", "click"], [1, "text-gray-500", "text-center", "text-2xl", "font-semibold"]],
  template: function WebUiFilePreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUiFilePreviewComponent_ng_container_0_Template, 3, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_1_Template, 5, 2, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_2_Template, 6, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiFilePreviewComponent_ng_container_3_Template, 5, 4, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WebUiFilePreviewComponent_ng_container_4_Template, 3, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiFilePreviewComponent_ng_template_5_Template, 2, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebUiFilePreviewComponent_ng_container_7_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.documents && ctx.documents.length > 0 && ctx.mode === "default");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "eye");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "button");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "avatar");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "gallery");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_11__.NgxExtendedPdfViewerComponent, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_12__.WebUiButtonComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__.MatProgressBar, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe],
  styles: [".minImage[_ngcontent-%COMP%] {\n  min-width: 200px;\n}", "ngx-extended-pdf-viewer .toolbarField.pageNumber.visiblePageIsLoading {\n  background: transparent !important;\n}", "ngx-extended-pdf-viewer .toolbarField.pageNumber {\n  text-align: center !important;\n  margin: 5px 0 !important;\n}", "ngx-extended-pdf-viewer #scaleSelectContainer select {\n  width: 120px !important;\n  padding-left: 15px;\n}", ".toolbarButton svg {\n  height: calc(100% - 5px) !important;\n  width: auto !important;\n  margin: 0 auto !important;\n}", "ngx-extended-pdf-viewer #secondaryToolbarButtonContainer {\n  display: flex !important;\n  flex-direction: column !important;\n  padding: 10px 0;\n}", "ngx-extended-pdf-viewer #secondaryToolbarButtonContainer button {\n  width: auto !important;\n}", ".mat-tooltip {\n  word-break: break-all !important;\n  white-space: normal !important;\n  \n}", "ngx-extended-pdf-viewer #numPages {\n  padding-top: 1px;\n}", ".center-image {\n  background-position: center !important;\n  background-size: cover !important;\n  background-repeat: no-repeat !important;\n}\n\n  ngneat-dialog .ngneat-dialog-backdrop {\n  z-index: 998 !important;\n}", _c1, _c1]
});

/***/ }),

/***/ 420251:
/*!*************************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/file-preview/web-ui-file-preview.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiFilePreviewModule": () => (/* binding */ WebUiFilePreviewModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-extended-pdf-viewer */ 803930);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./web-ui-file-preview.component */ 627718);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);









class WebUiFilePreviewModule {}
WebUiFilePreviewModule.ɵfac = function WebUiFilePreviewModule_Factory(t) {
  return new (t || WebUiFilePreviewModule)();
};
WebUiFilePreviewModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiFilePreviewModule
});
WebUiFilePreviewModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_2__.NgxExtendedPdfViewerModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__.MatProgressBarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiFilePreviewModule, {
    declarations: [_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFilePreviewComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_2__.NgxExtendedPdfViewerModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__.MatProgressBarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule],
    exports: [_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFilePreviewComponent]
  });
})();

/***/ }),

/***/ 587431:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/file-upload-mail-input/file-upload-mail-input.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileUploadMailInput": () => (/* binding */ FileUploadMailInput)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _mail_compose_mail_compose_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../mail-compose/mail-compose.service */ 919880);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _file_preview_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../file-preview/web-ui-file-preview.component */ 627718);





















const _c0 = ["filePreview"];
const _c1 = ["fileUpload"];
function FileUploadMailInput_ng_container_7_div_1__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FileUploadMailInput_ng_container_7_div_1__svg_svg_5_Template__svg_svg_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const file_r5 = ctx_r11.$implicit;
      const i_r6 = ctx_r11.index;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](!ctx_r9.formControl.disabled ? ctx_r9.fileDeleted(file_r5, i_r6) : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function FileUploadMailInput_ng_container_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "a", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FileUploadMailInput_ng_container_7_div_1_Template_a_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const file_r5 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r12.openDocument(file_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FileUploadMailInput_ng_container_7_div_1__svg_svg_5_Template, 2, 0, "svg", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", file_r5 == null ? null : file_r5.name)("matTooltip", file_r5 == null ? null : file_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r4.getAbbrName(file_r5 == null ? null : file_r5.name), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r4.formControl.disabled);
  }
}
function FileUploadMailInput_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FileUploadMailInput_ng_container_7_div_1_Template, 6, 4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.document);
  }
}
function FileUploadMailInput_ng_container_8_div_1__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FileUploadMailInput_ng_container_8_div_1__svg_svg_5_Template__svg_svg_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const file_r15 = ctx_r21.$implicit;
      const i_r16 = ctx_r21.index;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](!ctx_r19.formControl.disabled ? ctx_r19.fileDeleted(file_r15, i_r16) : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function FileUploadMailInput_ng_container_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "a", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FileUploadMailInput_ng_container_8_div_1_Template_a_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);
      const file_r15 = restoredCtx.$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r22.openDocument(file_r15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FileUploadMailInput_ng_container_8_div_1__svg_svg_5_Template, 2, 0, "svg", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r15 = ctx.$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", file_r15 == null ? null : file_r15.filename)("matTooltip", file_r15 == null ? null : file_r15.filename);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r14.getAbbrName(file_r15 == null ? null : file_r15.filename), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r14.formControl.disabled);
  }
}
function FileUploadMailInput_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FileUploadMailInput_ng_container_8_div_1_Template, 6, 4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.uploadedDocument);
  }
}
class FileUploadMailInput {
  constructor(ref, domSanitizer, route, store, toast, mailComposeService) {
    this.ref = ref;
    this.domSanitizer = domSanitizer;
    this.route = route;
    this.store = store;
    this.toast = toast;
    this.mailComposeService = mailComposeService;
    this.multiple = true;
    this.allowedExtensions = undefined;
    this.removedFileEvent = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.draftFiles$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject([]);
    this.draftFileDeleteEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.fChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.fChangedEventTargetFiles = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    //document$: BehaviorSubject<Array<DocumentInput>> = new BehaviorSubject<Array<DocumentInput>>([]);
    this.document = [];
    this.uploadedDocument = [];
    this.fileUploadErrorMessage = "Total size of the files can't be exceed 25MB";
    this.fieldBlur$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(false);
  }
  ngOnInit() {
    this.draftFiles$.pipe().subscribe(val => {
      if (val === null || val === void 0 ? void 0 : val.length) {
        this.uploadedDocument = val;
      }
    });
    this.removedFileEvent.subscribe(res => {
      if (res) {
        this.removeFileById(res);
      }
    });
  }
  ngAfterViewInit() {}
  fileChanged(event) {
    var _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
      if ((_a = event.target.files) === null || _a === void 0 ? void 0 : _a.length) {
        const datas = [];
        for (const ele of event.target.files) {
          const base64 = yield this.fileToDataURL(ele);
          datas.push({
            name: ele.name,
            extension: ele.type,
            size: ele.size,
            attachment: base64
          });
        }
        if (!this.checkFileSizeValidation(datas)) {
          this.formControl.patchValue(null);
          this.toast.error(this.fileUploadErrorMessage);
        } else {
          let docData = [...this.document, ...datas];
          let tmpData = [...this.document, ...this.uploadedDocument, ...datas];
          if (!this.checkFileSizeValidation(tmpData)) {
            this.formControl.patchValue(null);
            this.toast.error(this.fileUploadErrorMessage);
          } else {
            this.document = docData;
            this.formControl.patchValue(null);
            this.fChanged.emit(this.document);
          }
        }
        this.ref.markForCheck();
        this.ref.detectChanges();
      }
    });
  }
  fileToDataURL(file_) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file_);
      reader.addEventListener('load', function (event) {
        resolve(event.target.result);
      }, false);
    });
  }
  checkFileSizeValidation(files = []) {
    if (files && files.length) {
      const maxFileSizeInMB = 25;
      const totalFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
      let fileSizeSum = files.map(ele => ele.size).reduce((acc, cur) => acc + cur, 0);
      if (fileSizeSum > totalFileSizeInBytes) {
        return false;
      } else {
        return true;
      }
    }
  }
  getAbbrName(s) {
    const maxLength = 30; //30 Characters + ... returned
    if (!s) return '';
    return s.length > 30 ? s.slice(0, 30) + '...' : s;
  }
  fileDeleted(file, index) {
    if (file.id && file.draftId) {
      this.draftFileDeleteEvent.emit({
        draftId: file.draftId,
        id: file.id
      });
    } else {
      const data = this.document;
      data.splice(index, 1);
      this.document = data.length ? data : [];
      this.fChanged.emit(this.document);
      this.ref.markForCheck();
      this.ref.detectChanges();
    }
  }
  removeFileById(id) {
    let index = this.uploadedDocument.findIndex(ele => ele.id == id);
    this.uploadedDocument.splice(index, 1);
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  openDocument(file) {
    var _a;
    if (file.id) {
      const attachment = this.uploadedDocument.find(f => f.id === file.id);
      if (attachment) {
        this.filePreview(attachment);
      }
    } else {
      (_a = this.filePreviewComponent) === null || _a === void 0 ? void 0 : _a.document.next(file);
    }
  }
  filePreview(attachment) {
    var _a;
    const fileName = (_a = attachment.filename) !== null && _a !== void 0 ? _a : 'File';
    this.mailComposeService.getFile(attachment.id).subscribe(res => {
      var _a, _b;
      if (res) {
        const base64 = `data: ${attachment.content_type} ;base64,` + ((_a = res.file) === null || _a === void 0 ? void 0 : _a.body);
        const obj = {
          attachment: base64,
          extension: attachment.content_type,
          name: fileName,
          size: attachment.size
        };
        (_b = this.filePreviewComponent) === null || _b === void 0 ? void 0 : _b.document.next(obj);
      }
    });
  }
}
FileUploadMailInput.ɵfac = function FileUploadMailInput_Factory(t) {
  return new (t || FileUploadMailInput)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mail_compose_mail_compose_service__WEBPACK_IMPORTED_MODULE_9__.MailComposeService));
};
FileUploadMailInput.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FileUploadMailInput,
  selectors: [["file-upload-mail-input"]],
  viewQuery: function FileUploadMailInput_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.filePreviewComponent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.elRef = _t.first);
    }
  },
  inputs: {
    formControl: "formControl",
    multiple: "multiple",
    allowedExtensions: "allowedExtensions",
    removedFileEvent: "removedFileEvent",
    draftFiles$: "draftFiles$"
  },
  outputs: {
    draftFileDeleteEvent: "draftFileDeleteEvent",
    fChanged: "fChanged",
    fChangedEventTargetFiles: "fChangedEventTargetFiles"
  },
  decls: 13,
  vars: 7,
  consts: [[1, "flex", "my-auto", "mt-2"], ["id", "image-file-input", "type", "file", 1, "absolute", "h-0", "w-0", "opacity-0", "invisible", "pointer-events-none", 3, "multiple", "accept", "formControl", "change"], ["for", "image-file-input", "matRipple", "", 1, "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "cursor-pointer", "hover:bg-gray-400", "hover:bg-opacity-20", "dark:hover:bg-black", "dark:hover:bg-opacity-5"], [3, "svgIcon"], [1, "flex", "flex-wrap", "gap-2", "ml-3", 2, "min-height", "20px !important", "max-height", "100px !important", "overflow-y", "auto !important"], [4, "ngIf"], ["filePreviewTpl", ""], ["mode", "edit", 3, "isDownloadable"], ["filePreview", ""], ["class", "rounded-xl p-2.5 bg-stone-200", 4, "ngFor", "ngForOf"], [1, "rounded-xl", "p-2.5", "bg-stone-200"], [1, "flex", "flex-row", "justify-between", "items-center", "gap-4"], ["webUiFormFieldFile", "", "ngDefaultControl", "", 1, "text-blue-500", "no-underline", "hover:cursor-pointer", "break-all", 3, "download", "matTooltip", "click"], ["tooltip", "matTooltip"], ["xmlns", "http://www.w3.org/2000/svg", "class", "h-6 w-6 min-w-6 hover:cursor-pointer", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 3, "click", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-6", "w-6", "min-w-6", "hover:cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", 1, "text-red-500", "w-5", "h-5"]],
  template: function FileUploadMailInput_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "input", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function FileUploadMailInput_Template_input_change_2_listener($event) {
        return ctx.fileChanged($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div")(6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, FileUploadMailInput_ng_container_7_Template, 2, 1, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, FileUploadMailInput_ng_container_8_Template, 2, 1, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](9, null, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "ui-file-preview", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("multiple", ctx.multiple)("accept", ctx.allowedExtensions)("formControl", ctx.formControl);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:paper-clip");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.document.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.uploadedDocument.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isDownloadable", true);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlDirective, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _file_preview_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_14__.WebUiFilePreviewComponent],
  styles: [".mat-tooltip {\n  word-break: break-all !important;\n  white-space: normal !important;\n  \n}"],
  changeDetection: 0
});

/***/ }),

/***/ 929568:
/*!**************************************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/file-upload-mail-input/file-upload-mail-input.module.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileUploadMailInputModule": () => (/* binding */ FileUploadMailInputModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _file_upload_mail_input_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./file-upload-mail-input.component */ 587431);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 256623);
/* harmony import */ var _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../file-preview/web-ui-file-preview.module */ 420251);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


// import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
// import {WebUiFilePreviewModule} from '../../../../../file-preview/web-ui-file-preview.module'


// import { FileUploadMailInput } from './file-upload-mail-input.component'









class FileUploadMailInputModule {}
FileUploadMailInputModule.ɵfac = function FileUploadMailInputModule_Factory(t) {
  return new (t || FileUploadMailInputModule)();
};
FileUploadMailInputModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FileUploadMailInputModule
});
FileUploadMailInputModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.UiFormFieldModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_4__.WebUiButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule,
  // FormlyModule.forChild({
  //   types: [
  //     {
  //       name: 'file-upload-mail-component',
  //       component: FileUploadMailInput,
  //       wrappers: ['form-field'],
  //     },
  //   ],
  // }),
  _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_11__.WebUiFilePreviewModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FileUploadMailInputModule, {
    declarations: [_file_upload_mail_input_component__WEBPACK_IMPORTED_MODULE_12__.FileUploadMailInput],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.UiFormFieldModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_4__.WebUiButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule,
    // FormlyModule.forChild({
    //   types: [
    //     {
    //       name: 'file-upload-mail-component',
    //       component: FileUploadMailInput,
    //       wrappers: ['form-field'],
    //     },
    //   ],
    // }),
    _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_11__.WebUiFilePreviewModule],
    exports: [_file_upload_mail_input_component__WEBPACK_IMPORTED_MODULE_12__.FileUploadMailInput]
  });
})();

/***/ }),

/***/ 392301:
/*!*****************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/list/list.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxListComponent": () => (/* binding */ MailboxListComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _list_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./list.store */ 439750);
/* harmony import */ var _mailbox_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mailbox.constants */ 150648);
/* harmony import */ var _mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mail-compose/mail-compose.component */ 443060);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../mailbox.component */ 762389);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mailbox.service */ 652318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ng-select/ng-select */ 477437);


























const _c0 = ["mailList"];
const _c1 = ["assignLegalCaseTpl"];
function MailboxListComponent_ng_container_1_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxListComponent_ng_container_1_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r11.mailboxComponent.drawer.toggle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
  }
}
function MailboxListComponent_ng_container_1_mat_progress_bar_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 21);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function MailboxListComponent_ng_container_1_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 22)(1, "ui-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxListComponent_ng_container_1_div_24_Template_ui_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13.openLegalCaseAssignDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Mails selected : ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8.selectedMails.length);
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 37)(1, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxListComponent_ng_container_1_ng_container_27_div_3_Template_input_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r24);
      const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r22.mailChecked(mail_r15, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const i_r16 = ctx_r25.index;
    const mail_r15 = ctx_r25.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", i_r16)("formControlName", mail_r15.id);
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx_r28.participantsString(mail_r15.participants));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r28.participantsString(mail_r15.participants, true), " ");
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Draft");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_1_span_1_Template, 2, 2, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_1_span_2_Template, 2, 0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.participants.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.participants.length == 0);
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).$implicit;
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx_r32.participantsString(mail_r15.to));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r32.participantsString(mail_r15.to));
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Draft");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_2_span_1_Template, 2, 2, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_2_span_2_Template, 2, 0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.to.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.to.length == 0);
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_1_Template, 3, 2, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_ng_container_2_Template, 3, 2, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.object === "thread");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.object !== "thread");
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_8_span_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "To: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxListComponent_ng_container_1_ng_container_27_ng_container_8_span_2_span_1_Template, 2, 0, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx_r37.participantsString(mail_r15.participants));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r37.category.name === "sent");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r37.participantsString(mail_r15.participants, true), " ");
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0)(1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxListComponent_ng_container_1_ng_container_27_ng_container_8_span_2_Template, 3, 3, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]()();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.participants.length > 0);
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_mat_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 43);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:exclamation-circle");
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_div_16_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 47);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:paper-clip");
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_div_16_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 48);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:star");
  }
}
function MailboxListComponent_ng_container_1_ng_container_27_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxListComponent_ng_container_1_ng_container_27_div_16_mat_icon_1_Template, 1, 1, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxListComponent_ng_container_1_ng_container_27_div_16_mat_icon_2_Template, 1, 1, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.files && mail_r15.files.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.starred);
  }
}
const _c2 = function (a0, a1, a2, a3) {
  return {
    "border-primary": a0,
    "bg-primary-50 dark:bg-black dark:bg-opacity-5": a1,
    "grid custom-grid": a2,
    "pl-3": a3
  };
};
function MailboxListComponent_ng_container_1_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxListComponent_ng_container_1_ng_container_27_Template_a_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45);
      const mail_r15 = restoredCtx.$implicit;
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r44.onMailSelected(mail_r15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxListComponent_ng_container_1_ng_container_27_div_3_Template, 2, 2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 28)(5, "div", 29)(6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MailboxListComponent_ng_container_1_ng_container_27_ng_container_7_Template, 3, 2, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, MailboxListComponent_ng_container_1_ng_container_27_ng_container_8_Template, 3, 1, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MailboxListComponent_ng_container_1_ng_container_27_mat_icon_9_Template, 1, 1, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 33)(14, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, MailboxListComponent_ng_container_1_ng_container_27_div_16_Template, 3, 2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const mail_r15 = ctx.$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](13, _c2, mail_r15.unread, ctx_r10.selectedMail && ctx_r10.selectedMail.id === mail_r15.id, !ctx_r10._mailboxService.getLegalCaseId, ctx_r10._mailboxService.getLegalCaseId));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r10._mailboxService.getLegalCaseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", !ctx_r10._mailboxService.getLegalCaseId ? "col-span-1" : "col-span-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.mailType === "drafts");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.mailType !== "drafts");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.important);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](12, 10, mail_r15.date * 1000, "LLL dd"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](mail_r15.subject);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", mail_r15.files && mail_r15.files.length > 0 || mail_r15.starred);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", mail_r15.snippet, " ");
  }
}
const _c3 = function (a0) {
  return [a0];
};
function MailboxListComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 5)(2, "div", 6)(3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxListComponent_ng_container_1_button_4_Template, 2, 1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7)(8, "div", 10)(9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "of");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, MailboxListComponent_ng_container_1_mat_progress_bar_23_Template, 1, 1, "mat-progress-bar", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, MailboxListComponent_ng_container_1_div_24_Template, 6, 1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, MailboxListComponent_ng_container_1_ng_container_27_Template, 19, 18, "ng-container", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0._mailboxService.getLegalCaseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx_r0.category.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.category.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.pagination.startIndex + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.pagination.endIndex + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.pagination.totalResults);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r0.pagination.currentPage === 1)("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c3, "../" + (ctx_r0.pagination.currentPage > 1 ? ctx_r0.pagination.currentPage - 1 : 1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:chevron-left");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r0.pagination.currentPage === ctx_r0.pagination.lastPage)("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](19, _c3, "../" + (ctx_r0.pagination.currentPage < ctx_r0.pagination.lastPage ? ctx_r0.pagination.currentPage + 1 : ctx_r0.pagination.lastPage)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:chevron-right");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.mailsLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.selectedMails.length > 0 && !ctx_r0._mailboxService.getLegalCaseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r0.checkboxFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.mails)("ngForTrackBy", ctx_r0.trackByFn);
  }
}
function MailboxListComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "There are no e-mails");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:mailbox_empty");
  }
}
const _c4 = function (a0, a1) {
  return {
    "z-20 absolute inset-0 lg:static lg:inset-auto flex": a0,
    "hidden lg:flex": a1
  };
};
function MailboxListComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](1, _c4, ctx_r3.selectedMail && ctx_r3.selectedMail.id, !ctx_r3.selectedMail || !ctx_r3.selectedMail.id));
  }
}
function MailboxListComponent_ng_template_5_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 59)(1, "div")(2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Legal Case");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 60)(5, "ng-select", 61, 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MailboxListComponent_ng_template_5_div_3_Template_ng_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r48.legalCaseId = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r46.classNames);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r46.legalCaseId)("items", ctx_r46.items)("clearable", true);
  }
}
function MailboxListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 53)(1, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Assign Legal Case to Mail(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MailboxListComponent_ng_template_5_div_3_Template, 7, 5, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 56)(5, "ui-button", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxListComponent_ng_template_5_Template_ui_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r50.closeDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ui-button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxListComponent_ng_template_5_Template_ui_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r51);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r52.assignLegalCase());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r5._mailboxService.getLegalCaseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r5.legalCaseId);
  }
}
class MailboxListComponent {
  /**
   * Constructor
   */
  constructor(mailboxComponent, _mailboxService, store, _router, _matDialog, route, ref, dialog, _activatedRoute, fb) {
    this.mailboxComponent = mailboxComponent;
    this._mailboxService = _mailboxService;
    this.store = store;
    this._router = _router;
    this._matDialog = _matDialog;
    this.route = route;
    this.ref = ref;
    this.dialog = dialog;
    this._activatedRoute = _activatedRoute;
    this.fb = fb;
    this.mailsLoading = false;
    this.selectedMails = [];
    this.items = [];
    this.legalCaseId = null;
    this.checkboxFormGroup = this.fb.group({});
    this.vm$ = this.store.vm$;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.vm$.subscribe(data => {
      this.mails = data.item;
      this.setCheckboxArray();
      this.pagination = data.pagination;
      this.category = data.category;
      this.mailsLoading = data.mailsLoading;
      if (this.mailList && !data.mailsLoading) {
        this.mailList.nativeElement.scrollTo(0, 0);
      }
      this.ref.markForCheck();
      this.ref.detectChanges();
    });
    // Selected mail
    this._mailboxService.mail$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(mail => {
      this.selectedMail = mail;
      this.ref.markForCheck();
      this.ref.detectChanges();
    });
    this._mailboxService.readMail.subscribe(mailId => {
      var _a, _b;
      if (mailId) {
        const index = (_a = this.mails) === null || _a === void 0 ? void 0 : _a.findIndex(f => f.id == mailId && f.unread);
        if (index >= 0) {
          const obj = (_b = this.mails) === null || _b === void 0 ? void 0 : _b.find(f => f.id == mailId && f.unread);
          obj.unread = false;
          this.mails[index] = obj;
        }
      }
      this.ref.markForCheck();
      this.ref.detectChanges();
    });
    this.getLegalCases();
    setTimeout(() => {
      this.ref.markForCheck();
      this.ref.detectChanges();
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
  getLegalCases() {
    this._mailboxService.getLegalCases().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.take)(1)).subscribe({
      next: res => {
        this.items = res.data.items;
      },
      error: err => {
        this.items = [];
      }
    });
  }
  /**
   * On mail selected
   *
   * @param mail
   */
  onMailSelected(mail) {
    if ((mail === null || mail === void 0 ? void 0 : mail.object) === 'draft') {
      const dialogRef = this._matDialog.open(_mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_4__.WebUiMailComposeComponent, {
        data: {
          token: this._mailboxService.token,
          mail
        }
      });
      dialogRef.componentInstance.isClose$.subscribe(res => {
        if (res) {
          if (res.close) dialogRef.close();
          if (!res.cancel) this.getAndUpdateDraftListing(res.relatedTo);
        }
      });
      dialogRef.backdropClick().subscribe(() => (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
        yield dialogRef.componentInstance.updateDraftAndClose(mail.id);
      }));
      return;
    } else {
      this._router.navigate([mail.id], {
        relativeTo: this.route
      });
    }
    // If the mail is unread...
    // if ( mail.unread )
    // {
    //     // Update the mail object
    //     mail.unread = false;
    //     // Update the mail on the server
    // //    this._mailboxService.updateMail(mail.id, {unread: false}).subscribe();
    // }
    // static mark as read
    // if ( mail.unread ) {
    //     mail.unread = false;
    // }
    // Execute the mailSelected observable
    this._mailboxService.selectedMailChanged.next(mail);
  }
  participantsString(participants, isShort = false) {
    var _a;
    // console.log(participants.filter(f=>f.email !== this._mailboxService.email).map(m=> m.name).toString())
    let returnString = '';
    const temp = participants.filter(f => f.email !== this._mailboxService.email);
    if (isShort && temp.length > 0) {
      returnString = (_a = temp[0]) === null || _a === void 0 ? void 0 : _a.name;
      if (temp.length > 1) returnString = returnString + ' and ' + (temp.length - 1) + ' more';
    } else if (!isShort) {
      temp.forEach((ele, index) => {
        returnString = returnString + ele.name + (index < temp.length - 1 ? ', ' : '');
      });
    }
    return returnString;
  }
  getAndUpdateDraftListing(relatedTo = '') {
    const folder = this.route.snapshot.paramMap.get('folder');
    const page = this.route.snapshot.paramMap.get('page');
    if (folder && folder === 'draft' && relatedTo === _mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft) {
      this._mailboxService.getMailsByFolder('draft', page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.take)(1)).subscribe();
    } else if (folder && (folder === 'sent' || folder === 'all') && relatedTo === _mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.sent) {
      this._mailboxService.getMailsByFolder(folder, page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.take)(1)).subscribe();
    }
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
  mailChecked(mail, e) {
    e.stopImmediatePropagation && e.stopImmediatePropagation();
    if (Array.isArray(mail === null || mail === void 0 ? void 0 : mail.message_ids)) {
      if (e.target.checked) {
        this.selectedMails.push(...mail.message_ids);
      } else {
        this.selectedMails = this.selectedMails.filter(ele => !mail.message_ids.includes(ele));
      }
    }
  }
  openLegalCaseAssignDialog(size = 'sm') {
    const dialogRef = this.dialog.open(this.assignLegalCaseTpl, {
      size: size,
      resizable: false,
      closeButton: false
    });
  }
  assignLegalCase() {
    var _a, _b;
    const legalCaseId = (_a = this.legalCaseId) !== null && _a !== void 0 ? _a : null;
    const msgIds = (_b = this.selectedMails) !== null && _b !== void 0 ? _b : [];
    this._mailboxService.updateMessageByIds(legalCaseId, msgIds).subscribe(() => {
      this._router.navigate(['./'], {
        relativeTo: this._activatedRoute.parent
      });
    });
    this.closeDialog();
  }
  closeDialog() {
    this.dialog.closeAll();
    this.checkboxFormGroup.reset();
    this.selectedMails = [];
    this.legalCaseId = null;
  }
  setCheckboxArray() {
    // this.checkboxFormGroup = this.fb.group({});
    this.mails.forEach((ele, index) => {
      this.checkboxFormGroup.addControl(ele.id, this.fb.control(''));
    });
  }
}
MailboxListComponent.ɵfac = function MailboxListComponent_Factory(t) {
  return new (t || MailboxListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_component__WEBPACK_IMPORTED_MODULE_7__.MailboxComponent), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_8__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_list_store__WEBPACK_IMPORTED_MODULE_9__.MailboxListStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_12__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder));
};
MailboxListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MailboxListComponent,
  selectors: [["mailbox-list"]],
  viewQuery: function MailboxListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.mailList = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.assignLegalCaseTpl = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_list_store__WEBPACK_IMPORTED_MODULE_9__.MailboxListStore])],
  decls: 7,
  vars: 3,
  consts: [[1, "relative", "flex", "flex-auto", "w-full", "bg-card", "dark:bg-transparent"], [4, "ngIf", "ngIfElse"], ["noMails", ""], [4, "ngIf"], ["assignLegalCaseTpl", ""], [1, "relative", "flex", "flex-auto", "flex-col", "w-full", "min-w-0", "lg:min-w-90", "lg:max-w-90", "border-r", "z-10"], [1, "relative", "flex", "flex-0", "items-center", "justify-between", "h-16", "px-4", "border-b", "bg-gray-50", "dark:bg-transparent"], [1, "flex", "items-center"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], [1, "ml-2", "font-semibold", "uppercase", "truncate", "w-36", 3, "title"], [1, "flex", "items-center", "mr-3", "text-md", "font-medium"], [1, "mx-1", "text-secondary"], ["mat-icon-button", "", 1, "w-8", "h-8", "min-h-8", 3, "disabled", "routerLink"], [1, "icon-size-5", 3, "svgIcon"], ["class", "absolute inset-x-0 bottom-0 h-0.5", 3, "mode", 4, "ngIf"], ["class", "w-full relative flex flex-0 flex-col gap-2 items-center justify-center min-h-16 p-4 border-b bg-gray-50 dark:bg-transparent", 4, "ngIf"], [1, "overflow-y-auto", 3, "formGroup"], ["mailList", ""], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "absolute", "inset-x-0", "bottom-0", "h-0.5", 3, "mode"], [1, "w-full", "relative", "flex", "flex-0", "flex-col", "gap-2", "items-center", "justify-center", "min-h-16", "p-4", "border-b", "bg-gray-50", "dark:bg-transparent"], ["label", "Assign Legal Case to Selected Mail(s)", "variant", "Default", 3, "click"], [1, "font-semibold"], [1, "relative", "flex", "border-t", "first:border-0", "hover:bg-hover", "cursor-pointer", 3, "click"], [1, "w-full", "gap-2", "border-l-4", "border-transparent", 3, "ngClass"], ["class", "col-span-1 pl-1 flex items-center justify-center", 4, "ngIf"], [1, "col-span-1", "flex", "flex-col", "items-start", "justify-start", "py-6", "pr-4", 3, "ngClass"], [1, "flex", "items-center", "w-full"], [1, "font-semibold", "break-all"], ["class", "mr-3 icon-size-4 text-red-500 dark:text-red-600", 3, "svgIcon", 4, "ngIf"], [1, "ml-auto", "text-md", "text-right", "whitespace-nowrap", "text-hint"], [1, "flex", "items-center", "w-full", "mt-1"], [1, "leading-4", "truncate"], ["class", "flex ml-auto pl-2", 4, "ngIf"], [1, "mt-2", "leading-normal", "line-clamp-2", "text-secondary", "break-all"], [1, "col-span-1", "pl-1", "flex", "items-center", "justify-center"], ["type", "checkbox", 3, "id", "formControlName", "click"], [3, "title", 4, "ngIf"], ["class", "text-red-500", 4, "ngIf"], [3, "title"], [1, "text-red-500"], [1, "mr-3", "icon-size-4", "text-red-500", "dark:text-red-600", 3, "svgIcon"], [1, "flex", "ml-auto", "pl-2"], ["class", "flex justify-center icon-size-4", 3, "svgIcon", 4, "ngIf"], ["class", "flex justify-center icon-size-4 ml-1 text-orange-500 dark:text-orange-400", 3, "svgIcon", 4, "ngIf"], [1, "flex", "justify-center", "icon-size-4", 3, "svgIcon"], [1, "flex", "justify-center", "icon-size-4", "ml-1", "text-orange-500", "dark:text-orange-400", 3, "svgIcon"], [1, "z-100", "absolute", "inset-0", "flex", "flex-auto", "flex-col", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], [1, "icon-size-24", 3, "svgIcon"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"], [1, "flex-auto", 3, "ngClass"], [1, "p-8", "flex", "flex-auto", "flex-col", "gap-4", "items-center", "bg-gray-100", "dark:bg-transparent", "w-full", "h-full"], [1, "text-lg", "font-semibold"], ["class", "flex items-center legal-case-dropdown w-full", 4, "ngIf"], [1, "flex", "justify-between", "items-center", "flex-wrap", "w-full"], ["label", "Close", "variant", "white", 3, "click"], ["label", "Assign", "variant", "Default", 3, "disabled", "click"], [1, "flex", "items-center", "legal-case-dropdown", "w-full"], [1, "pl-3", "flex-grow", "max-w-3/4"], ["bindLabel", "name", "bindValue", "id", 3, "ngModel", "items", "clearable", "ngModelChange"], ["dropdown", ""]],
  template: function MailboxListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxListComponent_ng_container_1_Template, 28, 21, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxListComponent_ng_template_2_Template, 4, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MailboxListComponent_ng_container_4_Template, 3, 4, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MailboxListComponent_ng_template_5_Template, 7, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mails && ctx.mails.length > 0)("ngIfElse", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mails && ctx.mails.length > 0);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatIconAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_18__.WebUiButtonComponent, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_19__.NgSelectComponent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe],
  styles: ["::ng-deep ngneat-dialog .ngneat-dialog-content {\n  overflow: visible !important;\n}", ".custom-grid {\n  grid-template-columns: 1.5rem auto;\n}\n\n.ngneat-dialog-content {\n  overflow: visible !important;\n}"],
  encapsulation: 2
});

/***/ }),

/***/ 439750:
/*!*************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/list/list.store.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxListStore": () => (/* binding */ MailboxListStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mailbox.service */ 652318);




class MailboxListStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(_mailboxService) {
    super({
      loading: false,
      mailsLoading: false
    });
    this._mailboxService = _mailboxService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.pagination$ = this.select(s => s.pagination);
    this.category$ = this.select(s => s.category);
    this.mailsLoading$ = this.select(s => s.mailsLoading);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.pagination$, this.category$, this.mailsLoading$, (errors, loading, item, pagination, category, mailsLoading) => ({
      errors,
      loading,
      item,
      pagination,
      category,
      mailsLoading
    }), {
      debounce: true
    });
    this._mailboxService.mails$.subscribe(res => {
      this.patchState({
        item: res
      });
    });
    this._mailboxService.pagination$.subscribe(res => {
      this.patchState({
        pagination: res
      });
    });
    this._mailboxService.mailsLoading$.subscribe(res => {
      this.patchState({
        mailsLoading: res
      });
    });
    this._mailboxService.category$.subscribe(res => {
      this.patchState({
        category: res
      });
    });
  }
}
MailboxListStore.ɵfac = function MailboxListStore_Factory(t) {
  return new (t || MailboxListStore)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_2__.MailboxService));
};
MailboxListStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: MailboxListStore,
  factory: MailboxListStore.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 443060:
/*!*********************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mail-compose/mail-compose.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiMailComposeComponent": () => (/* binding */ WebUiMailComposeComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libs/web/mailbox/feature/src/lib/mailbox.constants */ 150648);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mail_compose_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mail-compose.service */ 919880);












const _c0 = ["filePreview"];
function WebUiMailComposeComponent_mat_progress_bar_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 20);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function WebUiMailComposeComponent_mailbox_email_input_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mailbox-email-input", 21);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("templateOption", ctx_r1.templateOption.cc)("formControl", ctx_r1.composeForm.controls["cc"]);
  }
}
function WebUiMailComposeComponent_mailbox_email_input_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mailbox-email-input", 21);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("templateOption", ctx_r2.templateOption.bcc)("formControl", ctx_r2.composeForm.controls["bcc"]);
  }
}
function WebUiMailComposeComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 22)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Legal Case");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ng-select", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r3.classNames);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "legalCaseId")("items", ctx_r3.items)("clearable", true);
  }
}
function WebUiMailComposeComponent_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiMailComposeComponent_button_23_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.discard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Discard");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiMailComposeComponent_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiMailComposeComponent_button_24_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.saveDraftAndClose());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r5.isEditDraft && !ctx_r5.isFormHavingValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.isEditDraft ? "Update Draft" : "Save as draft");
  }
}
class WebUiMailComposeComponent {
  constructor(matDialogRef, _formBuilder, mailComposeService, ref, dialogData) {
    this.matDialogRef = matDialogRef;
    this._formBuilder = _formBuilder;
    this.mailComposeService = mailComposeService;
    this.ref = ref;
    this.dialogData = dialogData;
    this.removedFileEvent$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.copyFields = {
      cc: false,
      bcc: false
    };
    this.isEditDraft = false;
    this.quillModules = {
      toolbar: [['bold', 'italic', 'underline'], [{
        align: []
      }, {
        list: 'ordered'
      }, {
        list: 'bullet'
      }], ['clean'], ['link']]
    };
    this.templateOption = {
      to: {
        multiple: true,
        label: 'To',
        required: true,
        isMaster: true,
        copyFields: this.copyFields
      },
      cc: {
        label: 'Cc',
        multiple: true
      },
      bcc: {
        label: 'Bcc',
        multiple: true
      }
    };
    this.formControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl('');
    this.selectedFiles$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
    this.isClose$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.draftFiles$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
    this.items = [];
    this.legalCaseId = "";
    this.isDisplayLegalCaseField = true;
  }
  ngOnInit() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Create the form
    this.composeForm = this._formBuilder.group({
      to: [[]],
      cc: [[]],
      bcc: [[]],
      subject: [''],
      body: [''],
      files: [[]],
      legalCaseId: []
    });
    if (this.dialogData) {
      if ((_a = this.dialogData) === null || _a === void 0 ? void 0 : _a.token) {
        this.mailComposeService.accessToken = this.dialogData.token;
        (_b = this.dialogData) === null || _b === void 0 ? true : delete _b.token;
      }
      if ((_c = this.dialogData) === null || _c === void 0 ? void 0 : _c.mail) {
        this.modalData = this.dialogData.mail;
      }
      this.legalCaseId = ((_d = this.dialogData) === null || _d === void 0 ? void 0 : _d.legalCaseId) ? (_e = this.dialogData) === null || _e === void 0 ? void 0 : _e.legalCaseId : "";
    }
    if (this.mailComposeService.getLegalCaseId) {
      this.legalCaseId = this.mailComposeService.getLegalCaseId;
    }
    if (((_f = this.dialogData) === null || _f === void 0 ? void 0 : _f.mailAction) === "Reply" || ((_g = this.dialogData) === null || _g === void 0 ? void 0 : _g.mailAction) === "Reply All" || ((_h = this.dialogData) === null || _h === void 0 ? void 0 : _h.mailAction) === "Forward" || this.mailComposeService.getLegalCaseId) {
      this.composeForm.get("legalCaseId").disable();
      this.isDisplayLegalCaseField = this.legalCaseId ? true : false;
    }
    this.composeForm.patchValue({
      "legalCaseId": this.legalCaseId ? this.legalCaseId : null
    });
    this.intialValue = JSON.stringify(this.composeForm.value);
    this.getLegalCases();
    this.setFormControlValue();
  }
  getLegalCases() {
    this.mailComposeService.getLegalCases().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
      next: res => {
        this.items = res.data.items;
        this.ref.markForCheck();
        this.ref.detectChanges();
      },
      error: err => {
        this.items = [];
        this.ref.markForCheck();
        this.ref.detectChanges();
      }
    });
  }
  get classNames() {
    const classes = 'custom block w-full text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md';
    return classes;
  }
  onCopyFieldChanged(copyFields) {
    this.copyFields = copyFields;
  }
  setFormControlValue() {
    var _a, _b, _c, _d;
    if (this.modalData) {
      this.isEditDraft = ((_a = this.dialogData) === null || _a === void 0 ? void 0 : _a.mailAction) ? false : true;
      this.composeForm.controls['subject'].setValue(this.modalData.subject);
      if (!((_b = this.dialogData) === null || _b === void 0 ? void 0 : _b.mailAction)) {
        this.composeForm.controls['body'].setValue((_c = this.modalData.body) !== null && _c !== void 0 ? _c : '');
      }
      this.composeForm.controls['to'].setValue(this.modalData.to.map(mail => mail.email));
      this.composeForm.controls['cc'].setValue(this.modalData.cc.map(mail => mail.email));
      if (this.modalData.cc.length > 0) {
        this.copyFields.cc = true;
      }
      this.composeForm.controls['bcc'].setValue(this.modalData.bcc.map(mail => mail.email));
      if (this.modalData.bcc.length > 0) {
        this.copyFields.bcc = true;
      }
      if ((_d = this.modalData.files) === null || _d === void 0 ? void 0 : _d.length) {
        let files = this.modalData.files.map(ele => {
          return Object.assign(Object.assign({}, ele), {
            draftId: this.modalData.id
          });
        });
        this.draftFiles$.next(files);
      }
      this.ref.markForCheck();
      this.ref.detectChanges();
    }
  }
  fChanged(files) {
    this.selectedFiles$.next(files);
    this.composeForm.controls['files'].patchValue(null);
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  saveDraftAndClose() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
      if (!this.isEditDraft) {
        if (this.isFormHavingValue) {
          yield this.saveAsDraft();
        }
      } else {
        yield this.updateDraft(this.modalData.id);
      }
    });
  }
  sendMailOrDraft() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
      this.validateToField();
      if (this.composeForm.valid) {
        if (!this.isEditDraft) {
          yield this.sendEmail();
        } else {
          yield this.sendDraft(this.modalData.id);
        }
      }
    });
  }
  updateDraftAndClose(draftId) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
      yield this.updateDraft(draftId);
    });
  }
  validateToField() {
    const control = this.composeForm.controls['to'];
    if (control && control.value) {
      if (!(control.value.length > 0)) {
        control.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]);
        control.updateValueAndValidity();
        return;
      }
    }
    control.removeValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]);
    control.updateValueAndValidity();
  }
  get isFormHavingValue() {
    var _a;
    let currentValue = Object.assign({}, this.composeForm.value);
    currentValue.body = (_a = currentValue.body) !== null && _a !== void 0 ? _a : '';
    currentValue.files = this.selectedFiles$.getValue();
    if (this.intialValue !== JSON.stringify(currentValue)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Discard the message
   */
  discard() {
    if (confirm('Are you sure you want to delete')) {
      this.deleteDraft();
    }
  }
  cancel() {
    if (confirm('Are you sure you want to discard all changes')) {
      this.isClose$.next({
        close: true,
        cancel: true
      });
    }
  }
  draftFileDeleteEvent(e) {
    this.mailComposeService.deleteDraftFile(e.draftId, e.id).subscribe({
      next: res => {
        this.removedFileEvent$.next(e.id);
        this.isClose$.next({
          close: false,
          relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
        });
      },
      error: err => {
        this.isClose$.next({
          close: false,
          relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
        });
      }
    });
  }
  deleteDraft(isSuccessMsgRequired = true) {
    return new Promise((resolve, reject) => {
      this.mailComposeService.deleteDraft(this.modalData.id, isSuccessMsgRequired = true).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
        next: res => {
          resolve(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
          });
        },
        error: err => {
          reject(err);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
          });
        }
      });
    });
  }
  updateDraft(draftId, isSuccessMsgRequired = true) {
    const formData = this.getFormData();
    return new Promise((resolve, reject) => {
      this.mailComposeService.updateDraft(draftId, formData, isSuccessMsgRequired).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
        next: res => {
          resolve(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
          });
        },
        error: err => {
          reject(err);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
          });
        }
      });
    });
  }
  saveAsDraft() {
    const formData = this.getFormData();
    return new Promise((resolve, reject) => {
      this.mailComposeService.saveAsDraft(formData).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
        next: res => {
          resolve(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
          });
        },
        error: err => {
          reject(err);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
          });
        }
      });
    });
  }
  sendDraft(draftId) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
      yield this.updateDraft(draftId, false);
      return new Promise((resolve, reject) => {
        this.mailComposeService.sendDraft(draftId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
          next: res => {
            resolve(res);
            this.isClose$.next({
              close: true,
              relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
            });
          },
          error: res => {
            reject(res);
            this.isClose$.next({
              close: true,
              relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.draft
            });
          }
        });
      });
    });
  }
  sendEmail() {
    var _a;
    if (((_a = this.dialogData) === null || _a === void 0 ? void 0 : _a.mailAction) === libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.MailAction.forward) {
      this.forwardEmail();
    } else {
      this.sendAndReplyEmail();
    }
  }
  sendAndReplyEmail() {
    const formData = this.getFormData();
    return new Promise((resolve, reject) => {
      this.mailComposeService.sendEmail(formData).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
        next: res => {
          resolve(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.sent
          });
        },
        error: res => {
          reject(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.sent
          });
        }
      });
    });
  }
  forwardEmail() {
    const formData = this.getFormData();
    formData.append('messageId', this.modalData.id);
    return new Promise((resolve, reject) => {
      this.mailComposeService.forwardEmail(formData).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
        next: res => {
          resolve(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.sent
          });
        },
        error: res => {
          reject(res);
          this.isClose$.next({
            close: true,
            relatedTo: libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.ApiRelateTo.sent
          });
        }
      });
    });
  }
  getFormData() {
    var _a, _b, _c, _d, _e, _f, _g;
    const data = this.composeForm.value;
    const formData = new FormData();
    formData.append('to', JSON.stringify(data.to.map(email => {
      return {
        email,
        name: email
      };
    })));
    formData.append('cc', JSON.stringify(data.cc.map(email => {
      return {
        email,
        name: email
      };
    })));
    formData.append('bcc', JSON.stringify(data.bcc.map(email => {
      return {
        email,
        name: email
      };
    })));
    formData.append('subject', data.subject);
    if (((_a = this.dialogData) === null || _a === void 0 ? void 0 : _a.mailAction) && (((_b = this.dialogData) === null || _b === void 0 ? void 0 : _b.mailAction) === libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.MailAction.reply || ((_c = this.dialogData) === null || _c === void 0 ? void 0 : _c.mailAction) === libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.MailAction.replyAll)) {
      formData.append('replyToMessageId', this.modalData.id);
      const inputBody = `<div dir="ltr" gmail_original="1">${(_d = data.body) !== null && _d !== void 0 ? _d : '<br>'}</div><br>`;
      const replyBody = (inputBody !== null && inputBody !== void 0 ? inputBody : '') + this.modalData.body;
      formData.append('body', replyBody ? replyBody : '');
    } else if (((_e = this.dialogData) === null || _e === void 0 ? void 0 : _e.mailAction) === libs_web_mailbox_feature_src_lib_mailbox_constants__WEBPACK_IMPORTED_MODULE_6__.MailAction.forward) {
      const inputBody = `${(_f = data.body) !== null && _f !== void 0 ? _f : '<br>'}<br>`;
      const forwardBody = (inputBody !== null && inputBody !== void 0 ? inputBody : '') + this.modalData.body;
      formData.append('body', forwardBody ? forwardBody : '');
    } else {
      formData.append('body', data.body ? data.body : '');
    }
    let fileData = this.selectedFiles$.getValue();
    if (fileData === null || fileData === void 0 ? void 0 : fileData.length) {
      for (let file of fileData) {
        var file2 = this.dataURLtoFile(file.attachment, file.name);
        formData.append('files', file2, file.name);
      }
    }
    if (data.legalCaseId || this.legalCaseId) {
      let legalCaseId = (_g = data.legalCaseId) !== null && _g !== void 0 ? _g : this.legalCaseId;
      formData.append('legalCaseId', legalCaseId);
    }
    return formData;
  }
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime
    });
  }
}
WebUiMailComposeComponent.ɵfac = function WebUiMailComposeComponent_Factory(t) {
  return new (t || WebUiMailComposeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mail_compose_service__WEBPACK_IMPORTED_MODULE_8__.MailComposeService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MAT_DIALOG_DATA));
};
WebUiMailComposeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiMailComposeComponent,
  selectors: [["ui-mail-compose"]],
  viewQuery: function WebUiMailComposeComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.filePreviewComponent = _t.first);
    }
  },
  decls: 27,
  vars: 23,
  consts: [[1, "flex", "flex-col", "max-w-240", "md:min-w-160", "compose-wrapper", "max-h-screen", "-m-6"], [1, "flex", "flex-0", "items-center", "justify-between", "h-16", "pr-3", "sm:pr-5", "pl-6", "sm:pl-8", "bg-primary", "text-on-primary"], [1, "text-lg", "font-medium"], ["mat-icon-button", "", 3, "tabIndex", "click"], [1, "text-current", 3, "svgIcon"], ["class", "h-0.5 z-20", 3, "mode", 4, "ngIf"], ["enctype", "multipart/form-data", 1, "flex", "flex-col", "flex-auto", "p-6", "sm:p-8", "overflow-y-auto", 3, "formGroup"], [3, "templateOption", "formControl", "onCopyFieldChanged"], [3, "templateOption", "formControl", 4, "ngIf"], [1, "subject-field"], ["matInput", "", 3, "formControlName"], [1, "mt-2", 3, "formControlName", "bounds", "modules"], ["class", "mt-5 legal-case-dropdown", 4, "ngIf"], [1, "flex", "my-auto", "mt-2"], [3, "formControl", "draftFiles$", "removedFileEvent", "multiple", "fChanged", "draftFileDeleteEvent"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "mt-4", "sm:mt-6"], [1, "flex", "items-center", "mt-4", "sm:mt-0"], ["class", "ml-auto sm:ml-0", "mat-stroked-button", "", 3, "click", 4, "ngIf"], ["class", "sm:mx-3", "mat-stroked-button", "", 3, "disabled", "click", 4, "ngIf"], ["mat-flat-button", "", 1, "order-first", "sm:order-last", 3, "color", "click"], [1, "h-0.5", "z-20", 3, "mode"], [3, "templateOption", "formControl"], [1, "mt-5", "legal-case-dropdown"], ["bindLabel", "name", "bindValue", "id", 3, "formControlName", "items", "clearable"], ["dropdown", ""], ["mat-stroked-button", "", 1, "ml-auto", "sm:ml-0", 3, "click"], ["mat-stroked-button", "", 1, "sm:mx-3", 3, "disabled", "click"]],
  template: function WebUiMailComposeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiMailComposeComponent_Template_button_click_4_listener() {
        return ctx.cancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, WebUiMailComposeComponent_mat_progress_bar_6_Template, 1, 1, "mat-progress-bar", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "form", 6)(9, "mailbox-email-input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onCopyFieldChanged", function WebUiMailComposeComponent_Template_mailbox_email_input_onCopyFieldChanged_9_listener($event) {
        return ctx.onCopyFieldChanged($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, WebUiMailComposeComponent_mailbox_email_input_10_Template, 1, 2, "mailbox-email-input", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, WebUiMailComposeComponent_mailbox_email_input_11_Template, 1, 2, "mailbox-email-input", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-form-field", 9)(13, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Subject");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "quill-editor", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, WebUiMailComposeComponent_div_17_Template, 5, 5, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13)(19, "div")(20, "file-upload-mail-input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("fChanged", function WebUiMailComposeComponent_Template_file_upload_mail_input_fChanged_20_listener($event) {
        return ctx.fChanged($event);
      })("draftFileDeleteEvent", function WebUiMailComposeComponent_Template_file_upload_mail_input_draftFileDeleteEvent_20_listener($event) {
        return ctx.draftFileDeleteEvent($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 15)(22, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, WebUiMailComposeComponent_button_23_Template, 2, 0, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, WebUiMailComposeComponent_button_24_Template, 3, 2, "button", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiMailComposeComponent_Template_button_click_25_listener() {
        return ctx.sendMailOrDraft();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Send");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((ctx.dialogData == null ? null : ctx.dialogData.mailAction) ? ctx.dialogData.mailAction : "New Message");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabIndex", -1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 21, ctx.mailComposeService.mailComposeLoading));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.composeForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("templateOption", ctx.templateOption.to)("formControl", ctx.composeForm.controls["to"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.copyFields.cc);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.copyFields.bcc);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "subject");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "body")("bounds", "self")("modules", ctx.quillModules);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isDisplayLegalCaseField);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.formControl)("draftFiles$", ctx.draftFiles$)("removedFileEvent", ctx.removedFileEvent$)("multiple", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isEditDraft);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(ctx.dialogData == null ? null : ctx.dialogData.mailAction));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    }
  },
  styles: [".subject-field[_ngcontent-%COMP%]     .mat-form-field-flex {\n  min-height: 40px !important;\n}\n\n.subject-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 11px 0 !important;\n}\n\n.subject-field[_ngcontent-%COMP%]     .mat-form-field-label-wrapper {\n  top: -21px !important;\n}\n\n.subject-field[_ngcontent-%COMP%]     .mat-form-field-label {\n  font-weight: 400 !important;\n}\n\n@media (min-width: 768px) {\n  .compose-wrapper[_ngcontent-%COMP%] {\n    max-width: 40rem !important;\n  }\n}\n  .legal-case-dropdown .ng-arrow-wrapper,   .legal-case-dropdown .ng-clear-wrapper.ng-star-inserted {\n  display: block !important;\n}"]
});

/***/ }),

/***/ 242857:
/*!******************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mail-compose/mail-compose.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiMailComposeModule": () => (/* binding */ WebUiMailComposeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _mail_compose_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mail-compose.component */ 443060);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-quill */ 890382);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-select/ng-select */ 477437);
/* harmony import */ var _mailbox_email_input_ui_form_mail_select_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mailbox-email-input/ui-form-mail-select.component */ 652621);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../file-preview/web-ui-file-preview.module */ 420251);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _mail_compose_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mail-compose.service */ 919880);
/* harmony import */ var _file_upload_mail_input_file_upload_mail_input_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../file-upload-mail-input/file-upload-mail-input.module */ 929568);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _file_upload_mail_input_file_upload_mail_input_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../file-upload-mail-input/file-upload-mail-input.component */ 587431);












// import { WebUiFormModule } from '../form/src'
// import { WebUiFormModule } from ''
// import { UiFormFieldModule } from '../form/src/lib/wrappers/form-field/ui-form-field.module'

















class WebUiMailComposeModule {}
WebUiMailComposeModule.ɵfac = function WebUiMailComposeModule_Factory(t) {
  return new (t || WebUiMailComposeModule)();
};
WebUiMailComposeModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiMailComposeModule
});
WebUiMailComposeModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_mail_compose_service__WEBPACK_IMPORTED_MODULE_1__.MailComposeService],
  imports: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInputModule, _file_upload_mail_input_file_upload_mail_input_module__WEBPACK_IMPORTED_MODULE_6__.FileUploadMailInputModule, ngx_quill__WEBPACK_IMPORTED_MODULE_7__.QuillModule.forRoot(), _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltipModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_10__.NgSelectModule, _angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule,
  // WebUiFormModule,
  // UiFormFieldModule,
  _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule, _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_15__.WebUiFilePreviewModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBarModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiMailComposeModule, {
    declarations: [_mail_compose_component__WEBPACK_IMPORTED_MODULE_17__.WebUiMailComposeComponent, _mailbox_email_input_ui_form_mail_select_component__WEBPACK_IMPORTED_MODULE_18__.UiFormMailSelectComponent],
    imports: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInputModule, _file_upload_mail_input_file_upload_mail_input_module__WEBPACK_IMPORTED_MODULE_6__.FileUploadMailInputModule, ngx_quill__WEBPACK_IMPORTED_MODULE_7__.QuillModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltipModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_10__.NgSelectModule, _angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule,
    // WebUiFormModule,
    // UiFormFieldModule,
    _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule, _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_15__.WebUiFilePreviewModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBarModule],
    exports: [_mail_compose_component__WEBPACK_IMPORTED_MODULE_17__.WebUiMailComposeComponent, _mailbox_email_input_ui_form_mail_select_component__WEBPACK_IMPORTED_MODULE_18__.UiFormMailSelectComponent]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetComponentScope"](_mail_compose_component__WEBPACK_IMPORTED_MODULE_17__.WebUiMailComposeComponent, function () {
  return [_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _file_upload_mail_input_file_upload_mail_input_component__WEBPACK_IMPORTED_MODULE_19__.FileUploadMailInput, ngx_quill__WEBPACK_IMPORTED_MODULE_7__.QuillEditorComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_10__.NgSelectComponent, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBar, _mailbox_email_input_ui_form_mail_select_component__WEBPACK_IMPORTED_MODULE_18__.UiFormMailSelectComponent];
}, function () {
  return [_angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe];
});

/***/ }),

/***/ 919880:
/*!*******************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mail-compose/mail-compose.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailComposeService": () => (/* binding */ MailComposeService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 984165);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);









class MailComposeService {
  constructor(http, data, toast) {
    this.http = http;
    this.data = data;
    this.toast = toast;
    this.filteredEmail = [];
    this._mailComposeLoading = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.baseUrl = _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_1__.environment === null || _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_1__.environment === void 0 ? void 0 : _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_1__.environment.email_api;
    this.legalCaseId = "";
  }
  get mailComposeLoading() {
    return this._mailComposeLoading.asObservable();
  }
  set setLegalCaseId(legalCaseId) {
    this.legalCaseId = legalCaseId;
  }
  get getLegalCaseId() {
    return this.legalCaseId;
  }
  searchEmails(searchStr) {
    return this.data.userSearchEmails({
      email: searchStr
    });
  }
  getLegalCases() {
    return this.data.userLegalCases({
      input: {
        name: "",
        limit: 10000,
        skip: 0
      }
    });
  }
  sendEmail(formData) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post(this.baseUrl + '/send-email', formData, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  sendDraft(draftId) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post(this.baseUrl + `/send-draft`, {
        draftId
      }, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  updateDraft(draftId, formData, isSuccessMsgRequired = true) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.put(this.baseUrl + `/draft/${draftId}`, formData, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        if (isSuccessMsgRequired) this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  forwardEmail(formData) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post(this.baseUrl + '/forward-email', formData, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        console.log('res', res);
        this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        console.log('err', err);
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  deleteDraft(draftId, isSuccessMsgRequired = true) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.delete(this.baseUrl + `/draft/${draftId}`, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        console.log('res', res);
        if (isSuccessMsgRequired) this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        console.log('err', err);
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  deleteDraftFile(draftId, fileId, isSuccessMsgRequired = true) {
    if (this.accessToken) {
      let req = {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        }),
        body: {
          draftId: draftId,
          fileId: fileId
        }
      };
      this._mailComposeLoading.next(true);
      return this.http.delete(this.baseUrl + `/draft-attachment`, req).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        console.log('res', res);
        if (isSuccessMsgRequired) this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        console.log('err', err);
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  saveAsDraft(formData) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post(this.baseUrl + '/draft', formData, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
          "authorization": this.accessToken
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
        this.toast.success(res.message);
        this._mailComposeLoading.next(false);
      }, err => {
        var _a;
        this.toast.error((_a = err.message) !== null && _a !== void 0 ? _a : err);
        this._mailComposeLoading.next(false);
      }));
    }
  }
  getFile(id) {
    this._mailComposeLoading.next(true);
    return this.http.get(this.baseUrl + '/file/' + id, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "authorization": this.accessToken
      })
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(() => {
      this._mailComposeLoading.next(false);
    }, () => {
      this._mailComposeLoading.next(false);
    }));
  }
  set accessToken(token) {
    this.token = token;
  }
  get accessToken() {
    return this.token;
  }
}
MailComposeService.ɵfac = function MailComposeService_Factory(t) {
  return new (t || MailComposeService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__.WebUiToastService));
};
MailComposeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: MailComposeService,
  factory: MailComposeService.ɵfac
});

/***/ }),

/***/ 652621:
/*!************************************************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mail-compose/mailbox-email-input/ui-form-mail-select.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiFormMailSelectComponent": () => (/* binding */ UiFormMailSelectComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _mail_compose_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mail-compose.service */ 919880);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-select/ng-select */ 477437);













const _c0 = ["dropDown"];
function UiFormMailSelectComponent_ng_template_6_input_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "input", 12);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const index_r10 = ctx_r12.index;
    const item$_r9 = ctx_r12.item$;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "item-", index_r10, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", item$_r9.selected);
  }
}
function UiFormMailSelectComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UiFormMailSelectComponent_ng_template_6_input_0_Template, 1, 2, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
  }
  if (rf & 2) {
    const item_r8 = ctx.item;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.to.multiple);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r8.name, " ");
  }
}
function UiFormMailSelectComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UiFormMailSelectComponent_ng_template_7_Template_span_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16);
      const item_r13 = restoredCtx.item;
      const clear_r14 = restoredCtx.clear;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](clear_r14(item_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r13 = ctx.item;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r13.email);
  }
}
function UiFormMailSelectComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Start typing...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function UiFormMailSelectComponent_ng_template_9_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UiFormMailSelectComponent_ng_template_9_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
      ctx_r19.addEmail();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.blur());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "path", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const searchTerm_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().searchTerm;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", searchTerm_r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](searchTerm_r17);
  }
}
function UiFormMailSelectComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UiFormMailSelectComponent_ng_template_9_button_0_Template, 6, 2, "button", 16);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((tmp_0_0 = ctx_r4.to == null ? null : ctx_r4.to.isAddBtn) !== null && tmp_0_0 !== undefined ? tmp_0_0 : true) && ctx_r4.isAddBtnRequired);
  }
}
function UiFormMailSelectComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const searchTerm_r22 = ctx.searchTerm;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Fetching data for \"", searchTerm_r22, "\"");
  }
}
function UiFormMailSelectComponent_div_11_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UiFormMailSelectComponent_div_11_span_1_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r25.showCopyField("cc"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Cc ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function UiFormMailSelectComponent_div_11_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UiFormMailSelectComponent_div_11_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r27.showCopyField("bcc"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Bcc ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function UiFormMailSelectComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UiFormMailSelectComponent_div_11_span_1_Template, 2, 0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UiFormMailSelectComponent_div_11_span_2_Template, 2, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.copyFields.cc);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.copyFields.bcc);
  }
}
function UiFormMailSelectComponent_mat_error_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "This field is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class UiFormMailSelectComponent {
  constructor(ngZone, ref, dialog, mailComposeService) {
    this.ngZone = ngZone;
    this.ref = ref;
    this.dialog = dialog;
    this.mailComposeService = mailComposeService;
    this.items = [];
    this.addedItems = [];
    this.selectedItems = [];
    this.allEmails = [];
    // public copyFields = { cc: false, bcc: false }
    this.value = null;
    this.loading = false;
    this.isAddBtnRequired = false;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.onCopyFieldChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  ngOnInit() {
    this.formControl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(val => {
      if (val && val.length > 0) {
        this.selectedItems = this.allEmails.filter(item => val.includes(item.email));
        this.ngSelect.searchTerm = '';
      } else {
        this.items = [];
      }
      this.isAddBtnRequired = false;
      this.ref.markForCheck();
      this.ref.detectChanges();
    });
    this.setPaddingDynamic();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  onClear(event) {
    this.items = [];
    this.addedItems = [];
    this.selectedItems = [];
    this.allEmails = [];
    this.isAddBtnRequired = false;
  }
  onBlur(event) {
    this.isAddBtnRequired = false;
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  showCopyField(name) {
    if (name !== 'cc' && name !== 'bcc') {
      return;
    }
    this.copyFields[name] = true;
    this.onCopyFieldChanged.emit(this.copyFields);
    this.setPaddingDynamic();
  }
  setPaddingDynamic() {
    var _a, _b;
    if ((_a = this.to) === null || _a === void 0 ? void 0 : _a.isMaster) {
      this.copyFields = (_b = this.to.copyFields) !== null && _b !== void 0 ? _b : {
        to: false,
        bcc: false
      };
      let clicked = 0;
      if (this.to.copyFields['cc'] && this.to.copyFields['bcc']) clicked = 2;else if (this.to.copyFields['cc'] || this.to.copyFields['bcc']) clicked = 1;
      const elem = document.querySelector('.ng-value-container');
      elem.classList.remove("padding5", "padding31", "padding62");
      elem.classList.add(clicked == 2 ? 'padding5' : clicked == 1 ? 'padding31' : 'padding62');
      this.ref.markForCheck();
      this.ref.detectChanges();
    }
  }
  onSearch(e) {
    if (e && (e === null || e === void 0 ? void 0 : e.term) && (e === null || e === void 0 ? void 0 : e.term.trim().length) > 0) {
      this.mailComposeService.searchEmails(e.term).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.take)(1)).subscribe({
        next: res => {
          this.isAddBtnRequired = false;
          this.searchTerm = e === null || e === void 0 ? void 0 : e.term;
          this.items = res.data.items.map(item => {
            item.name = item.email;
            return item;
          });
          if (this.items.length == 0 && this.validateEmail(e.term.trim())) {
            this.isAddBtnRequired = true;
          }
          if (this.addedItems.length > 0) {
            this.items = [...this.items, ...this.addedItems];
          }
          this.allEmails = this.removeDuplicateObject([...this.allEmails, ...this.items]);
          this.ref.markForCheck();
          this.ref.detectChanges();
        },
        error: err => {
          this.ngSelect.searchTerm = '';
          this.isAddBtnRequired = false;
          this.items = [];
          this.ref.markForCheck();
          this.ref.detectChanges();
        }
      });
    } else {
      this.items = [];
      this.isAddBtnRequired = false;
      this.ref.markForCheck();
      this.ref.detectChanges();
    }
  }
  onChange(event) {
    let flag = 0;
    if (event && event.length > 0) {
      flag = 1;
      this.addedItems = this.addedItems.filter(item => event.includes(item));
    } else {
      this.addedItems = [];
    }
    this.isAddBtnRequired = false;
  }
  clicked(e) {
    if (e) {
      this.formControl.setValue(e);
      this.value = e;
    }
  }
  displayFn(e) {
    return e ? e.name : null;
  }
  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  addEmail() {
    if (this.validateEmail(this.searchTerm)) {
      const newItem = {
        email: this.searchTerm,
        name: this.searchTerm
      };
      const controlVal = this.formControl.value;
      this.addedItems = [...this.addedItems, newItem];
      this.items = this.removeDuplicateObject([...this.selectedItems, ...this.addedItems]);
      this.formControl.setValue([...controlVal, newItem.email], {
        emitEvent: false
      });
      this.ngSelect.searchTerm = '';
      this.isAddBtnRequired = false;
      this.ref.detectChanges();
      this.ref.markForCheck();
    } else {
      this.ngSelect.searchTerm = '';
      this.isAddBtnRequired = false;
      alert('Can not be added invalid email');
    }
  }
  openModal() {
    if (!this.formControl.touched) {
      this.formControl.setErrors(null);
    }
  }
  validateEmail(email) {
    var validRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.trim().match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  removeDuplicateObject(arr) {
    return arr.filter((obj, index, self) => {
      return index === self.findIndex(t => t.email === obj.email);
    });
  }
  get classNames() {
    const classes = 'custom block w-full text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md';
    const invalidClasses = 'custom border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500';
    return this.formControl.hasError('required') ? `${classes} ${invalidClasses}` : classes;
  }
}
UiFormMailSelectComponent.ɵfac = function UiFormMailSelectComponent_Factory(t) {
  return new (t || UiFormMailSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mail_compose_service__WEBPACK_IMPORTED_MODULE_5__.MailComposeService));
};
UiFormMailSelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: UiFormMailSelectComponent,
  selectors: [["mailbox-email-input"]],
  viewQuery: function UiFormMailSelectComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ngSelect = _t.first);
    }
  },
  inputs: {
    to: ["templateOption", "to"],
    formControl: "formControl"
  },
  outputs: {
    onCopyFieldChanged: "onCopyFieldChanged"
  },
  decls: 13,
  vars: 17,
  consts: [[1, "mat-form-field-custom"], [1, "relative"], [3, "items", "placeholder", "bindLabel", "bindValue", "multiple", "virtualScroll", "loading", "formControl", "groupBy", "compareWith", "closeOnSelect", "search", "clear", "change", "blur"], ["dropDown", ""], ["ng-option-tmp", ""], ["ng-label-tmp", ""], ["ng-typetosearch-tmp", ""], ["ng-notfound-tmp", ""], ["ng-loadingtext-tmp", ""], ["class", "copy-fields", 4, "ngIf"], ["style", "color: red", "class", "border-red-600 mt-1", 4, "ngIf"], ["type", "checkbox", 3, "id", "ngModel", 4, "ngIf"], ["type", "checkbox", 3, "id", "ngModel"], [1, "ng-value-label"], [1, "ng-value-icon", "right", 3, "click"], [1, "ng-option", "disabled"], ["class", "cursor-pointer text-gray-500 flex w-full gap-1 p-3 hover:bg-gray-100 hover:text-gray-700 transition duration-200 justify-center items-center text-semibold text-md", "type", "button", 3, "click", 4, "ngIf"], ["type", "button", 1, "cursor-pointer", "text-gray-500", "flex", "w-full", "gap-1", "p-3", "hover:bg-gray-100", "hover:text-gray-700", "transition", "duration-200", "justify-center", "items-center", "text-semibold", "text-md", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "truncate", 3, "title"], [1, "copy-fields"], ["class", "text-sm font-medium cursor-pointer select-none hover:underline", "data-toggle", "cc", 3, "click", 4, "ngIf"], ["class", "ml-1 text-sm font-medium cursor-pointer select-none hover:underline", "data-toggle", "bcc", 3, "click", 4, "ngIf"], ["data-toggle", "cc", 1, "text-sm", "font-medium", "cursor-pointer", "select-none", "hover:underline", 3, "click"], ["data-toggle", "bcc", 1, "ml-1", "text-sm", "font-medium", "cursor-pointer", "select-none", "hover:underline", 3, "click"], [1, "border-red-600", "mt-1", 2, "color", "red"]],
  template: function UiFormMailSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1)(4, "ng-select", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("search", function UiFormMailSelectComponent_Template_ng_select_search_4_listener($event) {
        return ctx.onSearch($event);
      })("clear", function UiFormMailSelectComponent_Template_ng_select_clear_4_listener($event) {
        return ctx.onClear($event);
      })("change", function UiFormMailSelectComponent_Template_ng_select_change_4_listener($event) {
        return ctx.onChange($event);
      })("blur", function UiFormMailSelectComponent_Template_ng_select_blur_4_listener($event) {
        return ctx.onBlur($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, UiFormMailSelectComponent_ng_template_6_Template, 2, 2, "ng-template", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, UiFormMailSelectComponent_ng_template_7_Template, 4, 1, "ng-template", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, UiFormMailSelectComponent_ng_template_8_Template, 2, 0, "ng-template", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, UiFormMailSelectComponent_ng_template_9_Template, 1, 1, "ng-template", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, UiFormMailSelectComponent_ng_template_10_Template, 2, 1, "ng-template", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, UiFormMailSelectComponent_div_11_Template, 3, 2, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, UiFormMailSelectComponent_mat_error_12_Template, 2, 0, "mat-error", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_5_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.to.label, "", ctx.to.required ? "*" : "", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]((ctx.to == null ? null : ctx.to.className) || ctx.classNames);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("items", ctx.items)("placeholder", (ctx.to == null ? null : ctx.to.placeholder) || "")("bindLabel", (tmp_4_0 = ctx.to == null ? null : ctx.to.labelProp) !== null && tmp_4_0 !== undefined ? tmp_4_0 : "email")("bindValue", (tmp_5_0 = ctx.to == null ? null : ctx.to.valueProp) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "email")("multiple", ctx.to.multiple)("virtualScroll", false)("loading", ctx.loading)("formControl", ctx.formControl)("groupBy", ctx.to.groupBy)("compareWith", ctx.to == null ? null : ctx.to.compareWith)("closeOnSelect", ctx.to.multiple ? false : true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.to.isMaster);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.formControl.hasError("required"));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatError, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__.NgSelectComponent, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["ɵf"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["ɵh"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["ɵl"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["ɵm"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["ɵn"]],
  styles: [".ng-select .ng-select-container {\n  margin-top: 0px !important;\n}\n\n  .ng-dropdown-panel .ng-dropdown-panel-items .ng-option {\n  display: flex !important;\n  align-items: center;\n  gap: 8px;\n}\n\n  .custom input[type=checkbox] {\n  border-radius: 3px;\n}\n\n  ng-select.ng-invalid.ng-touched .ng-arrow-wrapper {\n  margin-right: 22px;\n}\n  ng-select.ng-invalid.ng-touched .ng-select-container {\n  border-color: rgb(252 165 165/var(--tw-border-opacity)) !important;\n}\n\n.mat-form-field.mat-form-field-appearance-fill.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%], .mat-form-field.mat-form-field-appearance-fill.mat-focused.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%] {\n  border-color: red !important;\n}\n\n.mat-form-field-custom[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding-bottom: 0;\n}\n\n  .mat-form-field-label {\n  font-weight: bold;\n}\n\n.cdk-overlay-container[_ngcontent-%COMP%] {\n  z-index: 2000;\n}\n\ntextarea.mat-input-element[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\n\n.coutry-name[_ngcontent-%COMP%] {\n  width: 190px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n  ngneat-dialog .ngneat-dialog-backdrop {\n  z-index: 500;\n}\n\n  .ng-arrow-wrapper,   .ng-clear-wrapper.ng-star-inserted {\n  display: none;\n}\n\n.copy-fields[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 8px;\n  bottom: 11px;\n  z-index: 10000;\n}\n\n.copy-fields-toggles-inner[_ngcontent-%COMP%] {\n  padding-right: 12px;\n}\n\n  .ng-value-container,   .padding5 {\n  padding-right: 5px;\n}\n\n  .padding62 {\n  padding-right: 62px;\n}\n\n  .padding31 {\n  padding-right: 31px;\n}"]
});

/***/ }),

/***/ 763555:
/*!************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox-auth-guard.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailBoxAuthGuard": () => (/* binding */ MailBoxAuthGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mailbox.service */ 652318);





class MailBoxAuthGuard {
  canActivate(route, state) {
    var _a;
    if (this._mailboxService.token) {
      if ((_a = route.params) === null || _a === void 0 ? void 0 : _a.legalCaseId) {
        this.router.navigate([state.url + '/all']);
      } else {
        this.router.navigate(['apps/mailbox/inbox']);
      }
    }
    return true;
  }
  constructor(router, _mailboxService, route) {
    this.router = router;
    this._mailboxService = _mailboxService;
    this.route = route;
  }
}
MailBoxAuthGuard.ɵfac = function MailBoxAuthGuard_Factory(t) {
  return new (t || MailBoxAuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_2__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.ActivatedRoute));
};
MailBoxAuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: MailBoxAuthGuard,
  factory: MailBoxAuthGuard.ɵfac
});

/***/ }),

/***/ 762389:
/*!***************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxComponent": () => (/* binding */ MailboxComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _mailbox_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mailbox.constants */ 150648);
/* harmony import */ var _mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mail-compose/mail-compose.component */ 443060);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mailbox.service */ 652318);
/* harmony import */ var _mail_compose_mail_compose_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mail-compose/mail-compose.service */ 919880);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./sidebar/sidebar.component */ 327412);






// import { WebUiMailComposeComponent } from 'libs/web/ui/mail-compose/mail-compose.component'

// import { MailComposeService } from '../../../../ui/mail-compose/mail-compose.service'















const _c0 = ["drawer"];
function MailboxComponent_mat_drawer_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-drawer", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mailbox-sidebar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx_r0.drawerMode)("opened", ctx_r0.drawerOpened);
  }
}
class MailboxComponent {
  /**
   * Constructor
   */
  constructor(_fuseMediaWatcherService, _matDialog, _mailboxService, _mailComposeService, route, ref) {
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this._matDialog = _matDialog;
    this._mailboxService = _mailboxService;
    this._mailComposeService = _mailComposeService;
    this.route = route;
    this.ref = ref;
    this.legalCaseId = "";
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
    var _a;
    this.legalCaseId = (_a = this.route.snapshot.params) === null || _a === void 0 ? void 0 : _a.legalCaseId;
    this._mailboxService.setLegalCaseId = this.legalCaseId;
    this._mailComposeService.setLegalCaseId = this.legalCaseId;
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened if the given breakpoint is active
      if (matchingAliases.includes('md')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
      setTimeout(() => {
        this.ref.markForCheck();
        this.ref.detectChanges();
      }, 2000);
    });
    this.ref.markForCheck();
    this.ref.detectChanges();
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  openComposeDialog() {
    // Open the dialog
    const dialogRef = this._matDialog.open(_mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_3__.WebUiMailComposeComponent, {
      data: {
        token: this._mailboxService.token
      }
    });
    dialogRef.componentInstance.isClose$.subscribe(res => {
      if (res) {
        dialogRef.close();
        if (!res.cancel) this.getAndUpdateDraftListing(res.relatedTo);
      }
    });
    dialogRef.backdropClick().subscribe(() => (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
      yield dialogRef.componentInstance.saveDraftAndClose();
    }));
  }
  getAndUpdateDraftListing(relatedTo = '') {
    var _a, _b;
    const location = window.location;
    const [folder, page] = (_b = (_a = location.href) === null || _a === void 0 ? void 0 : _a.split('mailbox/')[1]) === null || _b === void 0 ? void 0 : _b.split('/');
    if (folder && folder === 'draft' && relatedTo === _mailbox_constants__WEBPACK_IMPORTED_MODULE_5__.ApiRelateTo.draft) {
      this._mailboxService.getMailsByFolder('draft', page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe();
    } else if (folder && (folder === 'sent' || folder === 'all') && relatedTo === _mailbox_constants__WEBPACK_IMPORTED_MODULE_5__.ApiRelateTo.sent) {
      this._mailboxService.getMailsByFolder(folder, page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe();
    }
  }
}
MailboxComponent.ɵfac = function MailboxComponent_Factory(t) {
  return new (t || MailboxComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_7__.FuseMediaWatcherService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_9__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mail_compose_mail_compose_service__WEBPACK_IMPORTED_MODULE_10__.MailComposeService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
MailboxComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MailboxComponent,
  selectors: [["mailbox"]],
  viewQuery: function MailboxComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.drawer = _t.first);
    }
  },
  decls: 11,
  vars: 3,
  consts: [[1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex-auto", "h-full"], ["class", "w-72 dark:bg-gray-900", 3, "mode", "opened", 4, "ngIf"], [1, "flex", "flex-col", "overflow-hidden"], [1, "flex", "flex-auto", "overflow-hidden", "relative"], [1, "absolute", "global-compose-button"], ["mat-flat-button", "", 1, "mx-6", 3, "color", "click"], [3, "svgIcon"], [1, "ml-2"], [1, "w-72", "dark:bg-gray-900", 3, "mode", "opened"], ["drawer", ""]],
  template: function MailboxComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MailboxComponent_mat_drawer_2_Template, 3, 2, "mat-drawer", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-drawer-content", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5)(7, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxComponent_Template_button_click_7_listener() {
        return ctx.openComposeDialog();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Compose");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx._mailboxService.getLegalCaseId);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterOutlet, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__.MatDrawerContent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_16__.MailboxSidebarComponent],
  styles: [".global-compose-button {\n  bottom: 35px !important;\n  right: 25px !important;\n  z-index: 1000;\n}"],
  encapsulation: 2
});

/***/ }),

/***/ 150648:
/*!***************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.constants.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiRelateTo": () => (/* binding */ ApiRelateTo),
/* harmony export */   "MailAction": () => (/* binding */ MailAction),
/* harmony export */   "folders": () => (/* binding */ folders),
/* harmony export */   "labelColorDefs": () => (/* binding */ labelColorDefs),
/* harmony export */   "labelColors": () => (/* binding */ labelColors),
/* harmony export */   "labels": () => (/* binding */ labels),
/* harmony export */   "mailType": () => (/* binding */ mailType)
/* harmony export */ });
const labelColors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];
const labelColorDefs = {
  gray: {
    text: 'text-gray-500',
    bg: 'bg-gray-500',
    combined: 'text-gray-800 bg-gray-100'
  },
  red: {
    text: 'text-red-500',
    bg: 'bg-red-500',
    combined: 'text-red-800 bg-red-100'
  },
  orange: {
    text: 'text-orange-500',
    bg: 'bg-orange-500',
    combined: 'text-orange-800 bg-orange-100'
  },
  yellow: {
    text: 'text-yellow-500',
    bg: 'bg-yellow-500',
    combined: 'text-yellow-800 bg-yellow-100'
  },
  green: {
    text: 'text-green-500',
    bg: 'bg-green-500',
    combined: 'text-green-800 bg-green-100'
  },
  teal: {
    text: 'text-teal-500',
    bg: 'bg-teal-500',
    combined: 'text-teal-800 bg-teal-100'
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-500',
    combined: 'text-blue-800 bg-blue-100'
  },
  indigo: {
    text: 'text-indigo-500',
    bg: 'bg-indigo-500',
    combined: 'text-indigo-800 bg-indigo-100'
  },
  purple: {
    text: 'text-purple-500',
    bg: 'bg-purple-500',
    combined: 'text-purple-800 bg-purple-100'
  },
  pink: {
    text: 'text-pink-500',
    bg: 'bg-pink-500',
    combined: 'text-pink-800 bg-pink-100'
  }
};
const folders = [{
  id: '7c004a19-4506-48ef-93ab-f16381302e3b',
  title: 'Inbox',
  slug: 'inbox',
  icon: 'heroicons_outline:inbox',
  count: 0
}, {
  id: 'de1b41f6-6839-4f1b-9d2c-07e55f6f8f82',
  title: 'Starred',
  slug: 'starred',
  icon: 'heroicons_outline:star',
  count: 0
}, {
  id: '1ee2ea29-9a1f-4c27-b4d2-5e465703b6a0',
  title: 'Sent',
  slug: 'sent',
  icon: 'heroicons_outline:paper-airplane',
  count: 0
}, {
  id: 'fbdc8e79-a0c4-4a27-bc98-9c81ee7a86e5',
  title: 'Drafts',
  slug: 'draft',
  icon: 'heroicons_outline:document',
  count: 0
}, {
  id: '85c004a19-4506-48ef-93ab-f16365302e3b',
  title: 'All Mail',
  slug: 'all',
  icon: 'heroicons_outline:mail',
  count: 0
}, {
  id: '0197c436-2ef3-424d-b546-8b7f49186e15',
  title: 'Spam',
  slug: 'spam',
  icon: 'heroicons_outline:exclamation',
  count: 0
}, {
  id: '2fa74637-d362-4fd2-9a88-f7195a88bdde',
  title: 'Trash',
  slug: 'trash',
  icon: 'heroicons_outline:trash',
  count: 0
}];
const labels = [{
  id: 'b167d3c4-f6ed-4ea6-9579-a12f95a9d76e',
  title: 'Personal',
  slug: 'personal',
  color: 'blue'
}, {
  id: '745cf30e-ca84-47a1-a553-b70eb630d8e7',
  title: 'Work',
  slug: 'work',
  color: 'indigo'
}, {
  id: '8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3',
  title: 'Payments',
  slug: 'payments',
  color: 'red'
}, {
  id: 'b2d1e4e7-7cfd-4b51-ae59-217a093df754',
  title: 'Invoices',
  slug: 'invoices',
  color: 'teal'
}, {
  id: '184cd689-4ee4-47cf-9f8a-12233d614326',
  title: 'Accounts',
  slug: 'accounts',
  color: 'purple'
}, {
  id: 'b67fc437-6118-4ec8-a3c7-9320b828e3fc',
  title: 'Forums',
  slug: 'forums',
  color: 'green'
}];
const ApiRelateTo = {
  draft: 'DRAFT',
  sent: 'SENT'
};
const MailAction = {
  reply: 'Reply',
  replyAll: 'Reply All',
  forward: 'Forward'
};
const mailType = {
  thread: 'thread',
  message: 'message'
};

/***/ }),

/***/ 93351:
/*!*****************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.interceptor.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxInterceptor": () => (/* binding */ MailboxInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mailbox.service */ 652318);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);









class MailboxInterceptor {
  /**
   * Constructor
   */
  constructor(_mailboxService, toast, router) {
    this._mailboxService = _mailboxService;
    this.toast = toast;
    this.router = router;
  }
  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req, next) {
    // Clone the request object
    let newReq = req.clone();
    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    // if (this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken)) {
    if (!this._mailboxService.token) {
      this.router.navigate(['apps/mailbox']);
      return;
    }
    newReq = req.clone({
      headers: req.headers.set('Authorization', this._mailboxService.token)
    });
    // }
    // Response
    return next.handle(newReq).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.catchError)(error => {
      var _a, _b, _c, _d;
      // Catch "401 Unauthorized" responses
      if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpErrorResponse && error.status === 500) {
        const message = ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message) ? (_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.message : 'Server Error!';
        this.toast.error(message);
      }
      if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpErrorResponse && error.status === 401) {
        console.log('error');
        // Sign out
        // this._authService.signOut()
        // Reload the app
        //location.reload()
        const message = ((_c = error === null || error === void 0 ? void 0 : error.error) === null || _c === void 0 ? void 0 : _c.message) ? (_d = error === null || error === void 0 ? void 0 : error.error) === null || _d === void 0 ? void 0 : _d.message : 'Server Error!';
        this.toast.error(message);
        this._mailboxService.removeAccessTokenFromLocal();
        window.location.reload();
        this.router.navigate(['apps/mailbox']);
        // this.router.navigate(["dashboards","project"])
      }

      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(error);
    }));
  }
}
MailboxInterceptor.ɵfac = function MailboxInterceptor_Factory(t) {
  return new (t || MailboxInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_4__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
};
MailboxInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: MailboxInterceptor,
  factory: MailboxInterceptor.ɵfac
});

/***/ }),

/***/ 195240:
/*!************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxModule": () => (/* binding */ MailboxModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/divider */ 44850);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fuse/pipes/find-by-key */ 747922);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fuse/components/navigation */ 352221);
/* harmony import */ var _fuse_directives_scrollbar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fuse/directives/scrollbar */ 699230);
/* harmony import */ var _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @fuse/directives/scroll-reset */ 634697);
/* harmony import */ var _mailbox_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./mailbox.component */ 762389);
/* harmony import */ var _details_details_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./details/details.component */ 949429);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./list/list.component */ 392301);
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./settings/settings.component */ 43309);
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./sidebar/sidebar.component */ 327412);
/* harmony import */ var _mailbox_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mailbox.routing */ 629918);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _auth_mail_auth_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./auth/mail-auth.component */ 899946);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _mailbox_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mailbox.interceptor */ 93351);
/* harmony import */ var _mailbox_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mailbox-auth-guard.service */ 763555);
/* harmony import */ var _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mailbox.resolvers */ 912078);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mailbox.service */ 652318);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/expansion */ 49652);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ng-select/ng-select */ 477437);
/* harmony import */ var _mail_compose_mail_compose_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./mail-compose/mail-compose.module */ 242857);
/* harmony import */ var _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./file-preview/web-ui-file-preview.module */ 420251);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
















// import { SharedModule } from 'libs/shared/shared.module';






// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { WebUiMailComposeModule } from 'libs/web/ui/mail-compose/mail-compose.module'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries















class MailboxModule {}
MailboxModule.ɵfac = function MailboxModule_Factory(t) {
  return new (t || MailboxModule)();
};
MailboxModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: MailboxModule
});
MailboxModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_mailbox_service__WEBPACK_IMPORTED_MODULE_1__.MailboxService, _mailbox_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__.MailBoxAuthGuard, _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_3__.MailboxFoldersResolver, _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_3__.MailboxLabelsResolver, _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_3__.MailboxMailsResolver, _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_3__.MailboxMailResolver, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HTTP_INTERCEPTORS,
    useClass: _mailbox_interceptor__WEBPACK_IMPORTED_MODULE_6__.MailboxInterceptor,
    multi: true
  }],
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(_mailbox_routing__WEBPACK_IMPORTED_MODULE_8__.mailboxRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__.MatMenuModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_17__.MatProgressBarModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__.MatSidenavModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_20__.FuseFindByKeyPipeModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_21__.FuseNavigationModule, _fuse_directives_scrollbar__WEBPACK_IMPORTED_MODULE_22__.FuseScrollbarModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_23__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_24__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule, _mail_compose_mail_compose_module__WEBPACK_IMPORTED_MODULE_25__.WebUiMailComposeModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_26__.WebUiButtonModule, _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_27__.WebUiFilePreviewModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_28__.MatExpansionModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_29__.NgSelectModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MailboxModule, {
    declarations: [_mailbox_component__WEBPACK_IMPORTED_MODULE_30__.MailboxComponent, _details_details_component__WEBPACK_IMPORTED_MODULE_31__.MailboxDetailsComponent, _list_list_component__WEBPACK_IMPORTED_MODULE_32__.MailboxListComponent, _settings_settings_component__WEBPACK_IMPORTED_MODULE_33__.MailboxSettingsComponent, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_34__.MailboxSidebarComponent, _auth_mail_auth_component__WEBPACK_IMPORTED_MODULE_35__.MailAuthComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__.MatMenuModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_17__.MatProgressBarModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__.MatSidenavModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_20__.FuseFindByKeyPipeModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_21__.FuseNavigationModule, _fuse_directives_scrollbar__WEBPACK_IMPORTED_MODULE_22__.FuseScrollbarModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_23__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_24__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule, _mail_compose_mail_compose_module__WEBPACK_IMPORTED_MODULE_25__.WebUiMailComposeModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_26__.WebUiButtonModule, _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_27__.WebUiFilePreviewModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_28__.MatExpansionModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_29__.NgSelectModule]
  });
})();

/***/ }),

/***/ 912078:
/*!***************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.resolvers.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxFoldersResolver": () => (/* binding */ MailboxFoldersResolver),
/* harmony export */   "MailboxLabelsResolver": () => (/* binding */ MailboxLabelsResolver),
/* harmony export */   "MailboxMailResolver": () => (/* binding */ MailboxMailResolver),
/* harmony export */   "MailboxMailsResolver": () => (/* binding */ MailboxMailsResolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 104128);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 928746);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mailbox.service */ 652318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);






class MailboxFoldersResolver {
  /**
   * Constructor
   */
  constructor(_mailboxService) {
    this._mailboxService = _mailboxService;
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
    return this._mailboxService.getFolders();
  }
}
MailboxFoldersResolver.ɵfac = function MailboxFoldersResolver_Factory(t) {
  return new (t || MailboxFoldersResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_1__.MailboxService));
};
MailboxFoldersResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: MailboxFoldersResolver,
  factory: MailboxFoldersResolver.ɵfac
});
class MailboxLabelsResolver {
  /**
   * Constructor
   */
  constructor(_mailboxService) {
    this._mailboxService = _mailboxService;
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
    return this._mailboxService.getLabels();
  }
}
MailboxLabelsResolver.ɵfac = function MailboxLabelsResolver_Factory(t) {
  return new (t || MailboxLabelsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_1__.MailboxService));
};
MailboxLabelsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: MailboxLabelsResolver,
  factory: MailboxLabelsResolver.ɵfac
});
class MailboxMailsResolver {
  /**
   * Constructor
   */
  constructor(_mailboxService, _router) {
    this._mailboxService = _mailboxService;
    this._router = _router;
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
    // Don't allow page param to go below 1
    if (route.paramMap.get('page') && parseInt(route.paramMap.get('page'), 10) <= 0) {
      // Get the parent url
      const url = state.url.split('/').slice(0, -1).join('/') + '/1';
      // Navigate to there
      this._router.navigateByUrl(url);
      // Don't allow request to go through
      return false;
    }
    if (route.paramMap.get('legalCaseId')) {
      this._mailboxService.setLegalCaseId = route.paramMap.get('legalCaseId');
    }
    // Create and build the sources array
    const sources = [];
    // If folder is set on the parameters...
    if (route.paramMap.get('folder')) {
      let folder = route.paramMap.get('folder');
      let page = route.paramMap.get('page');
      sources.push(this._mailboxService.getMailsByFolder(folder, page));
    }
    // If label is set on the parameters...
    if (route.paramMap.get('label')) {
      sources.push(this._mailboxService.getMailsByLabel(route.paramMap.get('label'), route.paramMap.get('page')));
    }
    // Fork join all the sources
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(sources).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => {
      // If there is no selected mail, reset the mail every
      // time mail list changes. This will ensure that the
      // mail will be reset while navigating between the
      // folders/filters/labels but it won't reset on page
      // reload if we are reading a mail.
      // Try to get the current activated route
      let currentRoute = route;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      // Make sure there is no 'id' parameter on the current route
      if (!currentRoute.paramMap.get('id')) {
        // Reset the mail
        this._mailboxService.resetMail().subscribe();
      }
    }),
    // Error here means the requested page is not available
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      // Log the error
      console.error(error.message);
      // Get the parent url and append the last possible page number to the parent url
      const url = state.url.split('/').slice(0, -1).join('/') + '/' + error.pagination.lastPage;
      // Navigate to there
      this._router.navigateByUrl(url);
      // Throw an error
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error);
    }));
  }
}
MailboxMailsResolver.ɵfac = function MailboxMailsResolver_Factory(t) {
  return new (t || MailboxMailsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_1__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
};
MailboxMailsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: MailboxMailsResolver,
  factory: MailboxMailsResolver.ɵfac
});
class MailboxMailResolver {
  /**
   * Constructor
   */
  constructor(_mailboxService, _router) {
    this._mailboxService = _mailboxService;
    this._router = _router;
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
    return this._mailboxService.getMailByThreadId(route.paramMap.get('id')).pipe(
    // Error here means the requested mail is either
    // not available on the requested page or not
    // available at all
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      // Log the error
      console.error(error);
      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      // Navigate to there
      this._router.navigateByUrl(parentUrl);
      // Throw an error
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error);
    }));
  }
}
MailboxMailResolver.ɵfac = function MailboxMailResolver_Factory(t) {
  return new (t || MailboxMailResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_1__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
};
MailboxMailResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: MailboxMailResolver,
  factory: MailboxMailResolver.ɵfac
});

/***/ }),

/***/ 629918:
/*!*************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.routing.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mailboxRouteMatcher": () => (/* binding */ mailboxRouteMatcher),
/* harmony export */   "mailboxRoutes": () => (/* binding */ mailboxRoutes),
/* harmony export */   "mailboxRunGuardsAndResolvers": () => (/* binding */ mailboxRunGuardsAndResolvers)
/* harmony export */ });
/* harmony import */ var _auth_mail_auth_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/mail-auth.component */ 899946);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ 641854);
/* harmony import */ var _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mailbox.resolvers */ 912078);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/list.component */ 392301);
/* harmony import */ var _details_details_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./details/details.component */ 949429);
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settings/settings.component */ 43309);
/* harmony import */ var _mailbox_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mailbox.component */ 762389);
/* harmony import */ var _mailbox_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mailbox-auth-guard.service */ 763555);








/**
 * Mailbox custom route matcher
 *
 * @param url
 */
const mailboxRouteMatcher = url => {
  // Prepare consumed url and positional parameters
  let consumed = url;
  const posParams = {};
  // Settings
  if (url[0].path === 'settings') {
    // Do not match
    return null;
  }
  // Filter or label
  else if (url[0].path === 'filter' || url[0].path === 'label') {
    posParams[url[0].path] = url[1];
    posParams['page'] = url[2];
    // Remove the id if exists
    if (url[3]) {
      consumed = url.slice(0, -1);
    }
  }
  // Folder
  else {
    posParams['folder'] = url[0];
    posParams['page'] = url[1];
    // Remove the id if exists
    if (url[2]) {
      consumed = url.slice(0, -1);
    }
  }
  return {
    consumed,
    posParams
  };
};
const mailboxRunGuardsAndResolvers = (from, to) => {
  // If we are navigating from mail to mails, meaning there is an id in
  // from's deepest first child and there isn't one in the to's, we will
  // trigger the resolver
  // Get the current activated route of the 'from'
  let fromCurrentRoute = from;
  while (fromCurrentRoute.firstChild) {
    fromCurrentRoute = fromCurrentRoute.firstChild;
  }
  // Get the current activated route of the 'to'
  let toCurrentRoute = to;
  while (toCurrentRoute.firstChild) {
    toCurrentRoute = toCurrentRoute.firstChild;
  }
  // Trigger the resolver if the condition met
  if (fromCurrentRoute.paramMap.get('id') && !toCurrentRoute.paramMap.get('id')) {
    return true;
  }
  // If the from and to params are equal, don't trigger the resolver
  const fromParams = {};
  const toParams = {};
  from.paramMap.keys.forEach(key => {
    fromParams[key] = from.paramMap.get(key);
  });
  to.paramMap.keys.forEach(key => {
    toParams[key] = to.paramMap.get(key);
  });
  if ((0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(fromParams, toParams)) {
    return false;
  }
  // Trigger the resolver on other cases
  return true;
};
const mailboxRoutes = [{
  path: '',
  component: _auth_mail_auth_component__WEBPACK_IMPORTED_MODULE_1__.MailAuthComponent,
  canActivate: [_mailbox_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__.MailBoxAuthGuard]
}, {
  path: 'label/:label',
  redirectTo: 'label/:label/1',
  pathMatch: 'full'
}, {
  path: ':folder',
  redirectTo: ':folder/1',
  pathMatch: 'full'
}, {
  path: '',
  component: _mailbox_component__WEBPACK_IMPORTED_MODULE_3__.MailboxComponent,
  resolve: {
    folders: _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_4__.MailboxFoldersResolver,
    labels: _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_4__.MailboxLabelsResolver
  },
  children: [{
    component: _list_list_component__WEBPACK_IMPORTED_MODULE_5__.MailboxListComponent,
    matcher: mailboxRouteMatcher,
    runGuardsAndResolvers: mailboxRunGuardsAndResolvers,
    resolve: {
      mails: _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_4__.MailboxMailsResolver
    },
    children: [{
      path: '',
      children: [{
        path: ':id',
        // component: MailboxDetailsComponent,
        resolve: {
          mail: _mailbox_resolvers__WEBPACK_IMPORTED_MODULE_4__.MailboxMailResolver
        },
        component: _details_details_component__WEBPACK_IMPORTED_MODULE_6__.MailboxDetailsComponent
      }]
    }]
  }, {
    path: 'settings',
    component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_7__.MailboxSettingsComponent
  }]
}];

/***/ }),

/***/ 652318:
/*!*************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/mailbox.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxService": () => (/* binding */ MailboxService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var libs_core_feature_src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/core/feature/src/environments/environment */ 984165);
/* harmony import */ var _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mailbox.constants */ 150648);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 134793);













class MailboxService {
  /**
   * Constructor
   */
  constructor(_httpClient, toast, data, _activatedRoute, _router) {
    this._httpClient = _httpClient;
    this.toast = toast;
    this.data = data;
    this._activatedRoute = _activatedRoute;
    this._router = _router;
    this.selectedMailChanged = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._category = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._folders = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._labels = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._mails = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._mailsLoading = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this._labelsLoading = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this._mailDetailLoading = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this._mail = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._pagination = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this.readMail = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this.legalCaseId = "";
    this.url = libs_core_feature_src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.email_api;
    this.labelUrl = this.url + '/label/';
    // local
    this.token = this.getAccessToken();
    this.email = this.getMail();
    this.legalCaseMailListData = {
      count: 0,
      data: []
    };
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for category
   */
  get category$() {
    return this._category.asObservable();
  }
  /**
   * Getter for folders
   */
  get folders$() {
    return this._folders.asObservable();
  }
  /**
   * Getter for labels
   */
  get labels$() {
    return this._labels.asObservable();
  }
  /**
   * Getter for mails
   */
  get mails$() {
    return this._mails.asObservable();
  }
  /**
   * Getter for mails loading
   */
  get mailsLoading$() {
    return this._mailsLoading.asObservable();
  }
  get labelsLoading$() {
    return this._labelsLoading.asObservable();
  }
  get mailDetailLoading$() {
    return this._mailDetailLoading.asObservable();
  }
  /**
   * Getter for mail
   */
  get mail$() {
    return this._mail.asObservable();
  }
  /**
   * Getter for pagination
   */
  get pagination$() {
    return this._pagination.asObservable();
  }
  get readMail$() {
    return this.readMail.asObservable();
  }
  set setLegalCaseId(legalCaseId) {
    this.legalCaseId = legalCaseId;
  }
  get getLegalCaseId() {
    return this.legalCaseId;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get folders
   */
  getFolders() {
    this._folders.next(_mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.folders);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(_mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.folders);
    // return this._httpClient.get<MailFolder[]>('api/apps/mailbox/folders').pipe(
    //     tap((response: any) => {
    //         this._folders.next(response);
    //     })
    // );
  }
  /**
   * Get labels
   */
  getLabels() {
    return this._httpClient.get(this.url + '/labels').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
      const folders = ['drafts', 'spam', 'trash', 'sent', 'inbox', 'all'];
      response.data = response.data.filter(f => !folders.includes(f.name));
      this._labels.next(response.data);
    }));
  }
  /**
   * Get mails by folder
   */
  getMailsByFolder(folder, page = '1') {
    let folderSlug = folder;
    // Execute the mails loading with true
    this._mailsLoading.next(true);
    const resultsPerPage = 10;
    const pageNumber = Number(page !== null && page !== void 0 ? page : 1);
    const queryParams = {
      params: {
        offset: pageNumber - 1,
        limit: this.getLegalCaseId ? 1000000 : resultsPerPage
      }
    };
    if (this.getLegalCaseId) {
      queryParams.params["legalCaseId"] = this.getLegalCaseId;
      if (folder === 'all') {
        folderSlug = 'case-threads';
      } else {
        this._mailsLoading.next(false);
        this._router.navigate([this._router.url]);
        return;
      }
      if (!this.legalCaseMailListData.data.length) {
        queryParams.params["offset"] = 0;
      }
    }
    if (this.legalCaseMailListData.data.length && queryParams.params.offset) {
      let tmpRes = this.setLegalCaseMailPagination(Number(page !== null && page !== void 0 ? page : 1), this.legalCaseMailListData);
      let data = tmpRes.data;
      delete tmpRes.data;
      this._mails.next(data);
      const pagination = tmpRes;
      this._pagination.next(pagination);
      this._mailsLoading.next(false);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)({
        count: this.legalCaseMailListData.count,
        data: data
      });
    } else {
      return this._httpClient.get(this.url + '/' + folderSlug, queryParams).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
        this._category.next({
          type: 'folder',
          name: folder
        });
        response.data.forEach(element => (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
          element.mailType = yield this.getMailType(element);
        }));
        if (this.getLegalCaseId && folder === 'all') {
          this.legalCaseMailListData = {
            count: response.count,
            data: response.data
          };
          let tmpRes = this.setLegalCaseMailPagination(Number(page !== null && page !== void 0 ? page : 1), this.legalCaseMailListData);
          let data = tmpRes.data;
          delete tmpRes.data;
          this._mails.next(data);
          const pagination = tmpRes;
          this._pagination.next(pagination);
          this._mailsLoading.next(false);
        } else {
          this._mails.next(response.data);
          const pagination = this.setPagination(Number(page !== null && page !== void 0 ? page : 1), response.count);
          this._pagination.next(pagination);
          this._mailsLoading.next(false);
        }
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(response => {
        if (response.data === null) {
          const pagination = this.setPagination(Number(page !== null && page !== void 0 ? page : 1), response.data.length);
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)({
            message: 'Requested page is not available!',
            pagination: pagination
          });
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response);
      }));
    }
  }
  /**
   * Get mails by label
   */
  getMailsByLabel(labelId, page = '1') {
    // Execute the mails loading with true
    this._mailsLoading.next(true);
    const resultsPerPage = 10;
    const pageNumber = Number(page !== null && page !== void 0 ? page : 1);
    const queryParams = {
      params: {
        offset: pageNumber - 1,
        limit: resultsPerPage,
        labelId: labelId
      }
    };
    return this._httpClient.get(this.url + '/label-threads', queryParams).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(response => (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
      const labelName = yield this.getLabelNameById(labelId);
      this._category.next({
        type: 'label',
        name: labelName
      });
      response.data.forEach(element => (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
        element.mailType = yield this.getMailType(element);
      }));
      this._mails.next(response.data);
      const pagination = this.setPagination(Number(page !== null && page !== void 0 ? page : 1), response.count);
      this._pagination.next(pagination);
      this._mailsLoading.next(false);
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(response => {
      if (response.data === null) {
        const pagination = this.setPagination(Number(page !== null && page !== void 0 ? page : 1), response.data.length);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)({
          message: 'Requested page is not available!',
          pagination: pagination
        });
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response);
    }));
  }
  /**
   * Get mail by id
   */
  getMailById(id) {
    const queryParams = {
      params: {
        messageId: id
      }
    };
    this._mailDetailLoading.next(true);
    return this._httpClient.get(this.url + '/' + 'mail-details', queryParams).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
      if (response && response.data && response.data.labels) {
        // const folders = ['drafts', 'spam', 'trash', 'sent', 'inbox', 'all'];
        response.data.labelNames = response.data.labels.filter(f => f.name != '').map(m => m.name);
        // response.data.labels = response.data.labels.filter(f => !folders.includes(f.name));
      }

      const mail = response.data;
      // Update the mail
      this._mail.next(mail);
      this._mailDetailLoading.next(false);
      // Return the mail
      return mail;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(response => {
      this._mailDetailLoading.next(false);
      if (!response.data) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)('Could not found mail with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data);
    }));
  }
  getMailByThreadId(id) {
    this._mailDetailLoading.next(true);
    return this._httpClient.get(this.url + '/threads/' + id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
      if (response && response.data && response.data.labels) {
        // const folders = ['drafts', 'spam', 'trash', 'sent', 'inbox', 'all'];
        response.data.labelNames = response.data.labels.filter(f => f.name != '').map(m => m.name);
        // response.data.labels = response.data.labels.filter(f => !folders.includes(f.name));
      }

      if (response && response.data && response.data.messages.length > 0) {
        response.data.messages.forEach(element => {
          element.labelNames = element.labels.filter(f => f.name != '').map(m => m.name);
        });
      }
      const mail = response.data;
      // Update the mail
      this._mail.next(mail);
      this._mailDetailLoading.next(false);
      // Return the mail
      return mail;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(response => {
      this._mailDetailLoading.next(false);
      if (!response.data) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)('Could not found mail with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data);
    }));
  }
  /**
   * Update mail
   *
   * @param id
   * @param mail
   */
  updateMail(id, mail) {
    return this._httpClient.patch('api/apps/mailbox/mail', {
      id,
      mail
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      // Re-fetch the folders on mail update
      // to get the updated counts on the sidebar
      this.getFolders().subscribe();
    }));
  }
  /**
   * Reset the current mail
   */
  resetMail() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(true).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mail.next(null);
    }));
  }
  /**
   * Add label
   *
   * @param label
   */
  addLabel(label) {
    this._labelsLoading.next(true);
    return this._httpClient.post(this.labelUrl, {
      label: label.title.trim()
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(res => {
      this.getLabels().subscribe();
      this._labelsLoading.next(false);
      if (res && res.type) {
        this.toast.success("Created Successfully!");
      } else {
        this.toast.error("The label name you have chosen already exists. Please try another name");
      }
    }, () => {
      this._labelsLoading.next(false);
    }));
  }
  /**
   * Update label
   *
   * @param label
   */
  updateLabel(label) {
    this._labelsLoading.next(true);
    return this._httpClient.put(this.labelUrl + label.id, {
      name: label.title.trim()
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(res => {
      console.log('response');
      this.getLabels().subscribe();
      this._labelsLoading.next(false);
      if (res && res.type) {
        this.toast.success("Updated Successfully!");
      } else {
        this.toast.error("The label name you have chosen already exists. Please try another name");
      }
    }, () => {
      this._labelsLoading.next(false);
    }));
  }
  /**
   * Delete label
   *
   * @param id
   */
  deleteLabel(id) {
    this._labelsLoading.next(true);
    return this._httpClient.delete(this.labelUrl + id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      console.log('response');
      this.getLabels().subscribe();
      this._labelsLoading.next(false);
      this.toast.success("Deleted Successfully!");
    }, () => {
      this._labelsLoading.next(false);
    }));
  }
  // set accessToken(token: string) {
  //     localStorage.setItem('accessToken', token)
  // }
  // get accessToken(): string {
  //     // return localStorage.getItem('accessToken') ?? ''
  //     // return 'IW1exliKwtIfNtMIZmq7RIzjoTQY2P'
  //     return 'lvNPoRbYCmuZPYnB6C38Z9ZmqMADi4'
  // }
  toggleStar(isThread = true, id) {
    this._mailDetailLoading.next(true);
    const body = {
      object: isThread ? _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.thread : _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.message,
      id: id
    };
    return this._httpClient.post(this.url + '/star', body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  toggleUnread(isThread = true, id) {
    this._mailDetailLoading.next(true);
    const body = {
      object: isThread ? _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.thread : _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.message,
      ids: [id]
    };
    return this._httpClient.post(this.url + '/read', body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  toggleSpam(isThread = true, id, markSpam = true) {
    this._mailDetailLoading.next(true);
    const body = {
      object: isThread ? _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.thread : _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.message,
      ids: [id],
      markSpam: markSpam
    };
    return this._httpClient.post(this.url + '/toggle-spam', body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  toggleTrash(isThread = true, id, moveToTrash = true) {
    this._mailDetailLoading.next(true);
    const body = {
      object: isThread ? _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.thread : _mailbox_constants__WEBPACK_IMPORTED_MODULE_2__.mailType.message,
      ids: [id],
      moveToTrash: moveToTrash
    };
    return this._httpClient.post(this.url + '/toggle-trash', body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  assignLabel(labelId, threadId) {
    this._mailDetailLoading.next(true);
    const body = {
      threadId: threadId
    };
    return this._httpClient.post(this.url + '/mark-label/' + labelId, body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  unAssignLabel(labelId, threadId) {
    this._mailDetailLoading.next(true);
    const body = {
      threadId: threadId
    };
    return this._httpClient.post(this.url + '/unmark-label/' + labelId, body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  getFile(id) {
    this._mailDetailLoading.next(true);
    return this._httpClient.get(this.url + '/file/' + id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      this._mailDetailLoading.next(false);
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  updateMessageByIds(legalCaseId, msgIds) {
    this._mailDetailLoading.next(true);
    return this._httpClient.put(this.url + '/message', {
      legalCaseId: legalCaseId ? legalCaseId : "",
      ids: msgIds
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(res => {
      var _a;
      this._mailDetailLoading.next(false);
      if (res && ((_a = res === null || res === void 0 ? void 0 : res["data"]) === null || _a === void 0 ? void 0 : _a.length)) {
        this.toast.success("Updated Successfully!");
      } else {
        this.toast.error("Error while update!");
      }
    }, () => {
      this._mailDetailLoading.next(false);
    }));
  }
  setPagination(pageNumber = 1, length) {
    const mailsLength = length;
    const resultsPerPage = 10;
    const page = pageNumber;
    const begin = (page - 1) * resultsPerPage;
    const end = Math.min(resultsPerPage * page, mailsLength);
    const lastPage = Math.max(Math.ceil(mailsLength / resultsPerPage), 1);
    if (page > lastPage) {
      return {
        lastPage
      };
    } else {
      return {
        totalResults: mailsLength,
        resultsPerPage: resultsPerPage,
        currentPage: page,
        lastPage: lastPage,
        startIndex: begin,
        endIndex: end - 1
      };
    }
  }
  setLegalCaseMailPagination(pageNumber, response) {
    const mailsLength = response.count;
    const resultsPerPage = 10;
    const page = pageNumber;
    const begin = (page - 1) * resultsPerPage;
    const end = Math.min(resultsPerPage * page, mailsLength);
    const lastPage = Math.max(Math.ceil(mailsLength / resultsPerPage), 1);
    if (page > lastPage) {
      return {
        lastPage,
        data: response.data.slice(begin, end - 1)
      };
    } else {
      return {
        totalResults: mailsLength,
        resultsPerPage: resultsPerPage,
        currentPage: page,
        lastPage: lastPage,
        startIndex: begin,
        endIndex: end - 1,
        data: response.data.filter((ele, i) => i >= begin && i <= end - 1)
      };
    }
  }
  getMailType(mail) {
    return new Promise(resolve => {
      const folders = ['inbox', 'drafts', 'spam', 'trash', 'sent'];
      const label = mail.labels.find(f => folders.includes(f.name));
      let type = '';
      if (label) {
        type = label.name;
      }
      resolve(type);
    });
  }
  getLabelNameById(id) {
    return new Promise(resolve => {
      this.labels$.subscribe(labels => {
        var _a;
        let labelName = 'label';
        if (labels && labels.length > 0) {
          labelName = (_a = labels.find(f => f.id == id).display_name) !== null && _a !== void 0 ? _a : '';
        }
        resolve(labelName);
      });
    });
  }
  getAccessToken() {
    var _a;
    const emailService = JSON.parse(localStorage.getItem("emailService"));
    return (_a = emailService === null || emailService === void 0 ? void 0 : emailService.token) !== null && _a !== void 0 ? _a : null;
  }
  getMail() {
    var _a;
    const emailService = JSON.parse(localStorage.getItem("emailService"));
    return (_a = emailService === null || emailService === void 0 ? void 0 : emailService.email) !== null && _a !== void 0 ? _a : null;
  }
  setEmailService(obj) {
    localStorage.setItem("emailService", JSON.stringify(obj));
  }
  removeAccessTokenFromLocal() {
    localStorage.removeItem('emailService');
  }
  getLegalCases() {
    return this.data.userLegalCases({
      input: {
        name: "",
        limit: 10000,
        skip: 0
      }
    });
  }
}
MailboxService.ɵfac = function MailboxService_Factory(t) {
  return new (t || MailboxService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_11__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_12__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router));
};
MailboxService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
  token: MailboxService,
  factory: MailboxService.ɵfac
});

/***/ }),

/***/ 43309:
/*!*************************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/settings/settings.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxSettingsComponent": () => (/* binding */ MailboxSettingsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 371884);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mailbox.component */ 762389);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mailbox.service */ 652318);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 836895);














function MailboxSettingsComponent_mat_progress_bar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 16);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function MailboxSettingsComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 17)(2, "mat-form-field", 10)(3, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function MailboxSettingsComponent_ng_container_21_Template_input_keyup_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const label_r2 = restoredCtx.$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.labelKeyup(label_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxSettingsComponent_ng_container_21_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const label_r2 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.updateLabels(label_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxSettingsComponent_ng_container_21_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const label_r2 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6.deleteLabel(label_r2.get("id").value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Label title")("formControl", label_r2.get("title"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !label_r2.valid || !label_r2.dirty || label_r2.value.title === "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
  }
}
class MailboxSettingsComponent {
  /**
   * Constructor
   */
  constructor(mailboxComponent, _formBuilder, _mailboxService) {
    this.mailboxComponent = mailboxComponent;
    this._formBuilder = _formBuilder;
    this._mailboxService = _mailboxService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Create the labels form
    this.labelsForm = this._formBuilder.group({
      labels: this._formBuilder.array([]),
      newLabel: this._formBuilder.group({
        title: ['']
      })
    });
    // Labels
    this._mailboxService.labels$.subscribe(labels => {
      this.labelsForm.get('labels').controls = [];
      // Get the labels
      this.labels = labels;
      // Iterate through the labels
      labels.forEach(label => {
        // Create a label form group
        const labelFormGroup = this._formBuilder.group({
          id: [label.id],
          title: [label.display_name]
        });
        // Add the label form group to the labels form array
        this.labelsForm.get('labels').push(labelFormGroup);
      });
    });
    this.labelsForm.get('newLabel.title').valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(val => {
      if (val) {
        this.labelsForm.get('newLabel.title').patchValue(val.trimLeft());
      }
    })).subscribe();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Add a label
   */
  addLabel() {
    // Add label to the server
    this._mailboxService.addLabel(this.labelsForm.get('newLabel').value).subscribe();
    // Reset the new label form
    this.labelsForm.get('newLabel').markAsPristine();
    this.labelsForm.get('newLabel').markAsUntouched();
    this.labelsForm.get('newLabel.title').reset();
    this.labelsForm.get('newLabel.title').clearValidators();
    this.labelsForm.get('newLabel.title').updateValueAndValidity();
  }
  /**
   * Delete a label
   */
  deleteLabel(id) {
    this._mailboxService.deleteLabel(id).subscribe();
  }
  /**
   * Update labels
   */
  updateLabels(label) {
    this._mailboxService.updateLabel(label.value).subscribe();
  }
  labelKeyup(labelControl) {
    const val = labelControl.get('title').value;
    if (val) {
      labelControl.get('title').setValue(val.trimLeft());
    }
  }
}
MailboxSettingsComponent.ɵfac = function MailboxSettingsComponent_Factory(t) {
  return new (t || MailboxSettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_component__WEBPACK_IMPORTED_MODULE_3__.MailboxComponent), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_5__.MailboxService));
};
MailboxSettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MailboxSettingsComponent,
  selectors: [["mailbox-settings"]],
  decls: 22,
  vars: 12,
  consts: [[1, "flex", "flex-col", "flex-auto", "overflow-y-auto", "p-8"], ["class", "absolute inset-x-0 top-0 h-0.5", 3, "mode", 4, "ngIf"], [1, "flex", "items-center"], [1, "md:hidden", "-ml-2", "mr-3"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "text-3xl", "font-extrabold", "tracking-tight"], [1, "text-secondary"], [1, "mt-8", 3, "formGroup"], [1, "flex", "items-center", "justify-start", "w-full", "max-w-80", "mt-6", 3, "formGroupName"], [1, "w-full"], ["matInput", "", "maxlength", "191", 3, "formControlName", "placeholder"], ["mat-icon-button", "", "matSuffix", "", 3, "disabled", "click"], [1, "icon-size-5", 3, "svgIcon"], [1, "flex", "flex-col", "w-full", "mt-4", 2, "max-width", "22.5rem !important", 3, "formArrayName"], [4, "ngFor", "ngForOf"], [1, "absolute", "inset-x-0", "top-0", "h-0.5", 3, "mode"], [1, "flex"], ["matInput", "", "maxlength", "191", 3, "placeholder", "formControl", "keyup"], ["mat-icon-button", "", "matSuffix", "", 3, "click"]],
  template: function MailboxSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MailboxSettingsComponent_mat_progress_bar_1_Template, 1, 1, "mat-progress-bar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2)(4, "div", 3)(5, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxSettingsComponent_Template_button_click_5_listener() {
        return ctx.mailboxComponent.drawer.toggle();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div")(8, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Manage Labels");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Create, update and delete labels");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "form", 8)(13, "div", 9)(14, "mat-form-field", 10)(15, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "New Label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MailboxSettingsComponent_Template_button_click_18_listener() {
        return ctx.addLabel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "mat-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, MailboxSettingsComponent_ng_container_21_Template, 8, 5, "ng-container", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 10, ctx._mailboxService.labelsLoading$));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.labelsForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroupName", "newLabel");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "title")("placeholder", "Label title");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.labelsForm.get("newLabel").valid || !ctx.labelsForm.get("newLabel").dirty || ctx.labelsForm.get("newLabel").value.title === "");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formArrayName", "labels");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.labelsForm.get("labels")["controls"]);
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__.MatProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormArrayName, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 327412:
/*!***********************************************************************!*\
  !*** ./libs/web/mailbox/feature/src/lib/sidebar/sidebar.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxSidebarComponent": () => (/* binding */ MailboxSidebarComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var _mailbox_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mailbox.constants */ 150648);
/* harmony import */ var _mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mail-compose/mail-compose.component */ 443060);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _mailbox_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../mailbox.service */ 652318);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/components/navigation */ 359741);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fuse/components/navigation/vertical/vertical.component */ 156739);














class MailboxSidebarComponent {
  /**
   * Constructor
   */
  constructor(_mailboxService, _matDialog, _fuseNavigationService) {
    this._mailboxService = _mailboxService;
    this._matDialog = _matDialog;
    this._fuseNavigationService = _fuseNavigationService;
    this.menuData = [];
    this.defaultRoute = '/apps';
    this._foldersMenuData = [];
    this._labelsMenuData = [];
    this._otherMenuData = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Folders
    this._mailboxService.folders$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this._unsubscribeAll)).subscribe(folders => {
      this.folders = folders;
      // Generate menu links
      this._generateFoldersMenuLinks();
      // Update navigation badge
      this._updateNavigationBadge(folders);
    });
    // Labels
    this._mailboxService.labels$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this._unsubscribeAll)).subscribe(labels => {
      this.labels = labels;
      // Generate menu links
      this._generateLabelsMenuLinks();
    });
    // Generate other menu links
    this._generateOtherMenuLinks();
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
   * Open compose dialog
   */
  openComposeDialog() {
    // Open the dialog
    const dialogRef = this._matDialog.open(_mail_compose_mail_compose_component__WEBPACK_IMPORTED_MODULE_2__.WebUiMailComposeComponent, {
      data: {
        token: this._mailboxService.token
      }
    });
    dialogRef.componentInstance.isClose$.subscribe(res => {
      if (res) {
        dialogRef.close();
        if (!res.cancel) this.getAndUpdateDraftListing(res.relatedTo);
      }
    });
    dialogRef.backdropClick().subscribe(() => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
      yield dialogRef.componentInstance.saveDraftAndClose();
    }));
  }
  getAndUpdateDraftListing(relatedTo = '') {
    var _a, _b;
    const location = window.location;
    const [folder, page] = (_b = (_a = location.href) === null || _a === void 0 ? void 0 : _a.split('mailbox/')[1]) === null || _b === void 0 ? void 0 : _b.split('/');
    if (folder && folder === 'draft' && relatedTo === _mailbox_constants__WEBPACK_IMPORTED_MODULE_4__.ApiRelateTo.draft) {
      this._mailboxService.getMailsByFolder('draft', page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.take)(1)).subscribe();
    } else if (folder && (folder === 'sent' || folder === 'all') && relatedTo === _mailbox_constants__WEBPACK_IMPORTED_MODULE_4__.ApiRelateTo.sent) {
      this._mailboxService.getMailsByFolder(folder, page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.take)(1)).subscribe();
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Generate menus for folders
   *
   * @private
   */
  _generateFoldersMenuLinks() {
    // Reset the folders menu data
    this._foldersMenuData = [];
    // Iterate through the folders
    this.folders.forEach(folder => {
      // Generate menu item for the folder
      const menuItem = {
        id: folder.id,
        title: folder.title,
        type: 'basic',
        icon: folder.icon,
        link: this.defaultRoute + '/mailbox/' + folder.slug
      };
      // If the count is available and is bigger than zero...
      if (folder.count && folder.count > 0) {
        // Add the count as a badge
        menuItem['badge'] = {
          title: folder.count + ''
        };
      }
      // Push the menu item to the folders menu data
      this._foldersMenuData.push(menuItem);
    });
    // Update the menu data
    this._updateMenuData();
  }
  /**
   * Generate menus for labels
   *
   * @private
   */
  _generateLabelsMenuLinks() {
    // Reset the labels menu
    this._labelsMenuData = [];
    // Iterate through the labels
    this.labels.forEach(label => {
      // Generate menu item for the label
      this._labelsMenuData.push({
        id: label.id,
        title: label.display_name,
        type: 'basic',
        icon: 'heroicons_outline:tag',
        link: this.defaultRoute + '/mailbox/label/' + label.id
      });
    });
    // Update the menu data
    this._updateMenuData();
  }
  /**
   * Generate other menus
   *
   * @private
   */
  _generateOtherMenuLinks() {
    // Settings menu
    this._otherMenuData.push({
      title: 'Settings',
      type: 'basic',
      icon: 'heroicons_outline:cog',
      link: this.defaultRoute + '/mailbox/settings'
    });
    // Update the menu data
    this._updateMenuData();
  }
  /**
   * Update the menu data
   *
   * @private
   */
  _updateMenuData() {
    this.menuData = [{
      title: 'MAILBOXES',
      type: 'group',
      children: [...this._foldersMenuData]
    }, {
      title: 'LABELS',
      type: 'group',
      children: [...this._labelsMenuData]
    }, {
      type: 'spacer'
    }, ...this._otherMenuData];
  }
  /**
   * Update the navigation badge using the
   * unread count of the inbox folder
   *
   * @param folders
   * @private
   */
  _updateNavigationBadge(folders) {
    // Get the inbox folder
    const inboxFolder = this.folders.find(folder => folder.slug === 'inbox');
    // Get the component -> navigation data -> item
    const mainNavigationComponent = this._fuseNavigationService.getComponent('mainNavigation');
    // If the main navigation component exists...
    if (mainNavigationComponent) {
      const mainNavigation = mainNavigationComponent.navigation;
      const menuItem = this._fuseNavigationService.getItem('apps.mailbox', mainNavigation);
      // Update the badge title of the item
      if (menuItem && menuItem.badge && menuItem.badge.title) {
        menuItem.badge.title = inboxFolder.count + '';
      }
      // Refresh the navigation
      mainNavigationComponent.refresh();
    }
  }
}
MailboxSidebarComponent.ɵfac = function MailboxSidebarComponent_Factory(t) {
  return new (t || MailboxSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_mailbox_service__WEBPACK_IMPORTED_MODULE_7__.MailboxService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_fuse_components_navigation__WEBPACK_IMPORTED_MODULE_9__.FuseNavigationService));
};
MailboxSidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: MailboxSidebarComponent,
  selectors: [["mailbox-sidebar"]],
  decls: 8,
  vars: 6,
  consts: [[1, "flex", "flex-col", "flex-auto", "w-full"], [1, "mt-10", "mb-8", "mx-6", "text-4xl", "font-extrabold", "tracking-tight", "leading-none"], ["mat-flat-button", "", 1, "mx-6", 3, "color", "click"], [3, "svgIcon"], [1, "ml-2"], [3, "navigation", "inner", "mode", "opened"]],
  template: function MailboxSidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Mailbox");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MailboxSidebarComponent_Template_button_click_3_listener() {
        return ctx.openComposeDialog();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Compose");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "fuse-vertical-navigation", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("navigation", ctx.menuData)("inner", true)("mode", "side")("opened", true);
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_12__.FuseVerticalNavigationComponent],
  styles: ["mailbox-sidebar fuse-vertical-navigation .fuse-vertical-navigation-wrapper {\n  box-shadow: none !important;\n}"],
  encapsulation: 2
});

/***/ })

}]);