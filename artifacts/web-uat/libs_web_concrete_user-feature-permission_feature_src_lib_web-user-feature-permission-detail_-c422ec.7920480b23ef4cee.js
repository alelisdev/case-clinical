"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_user-feature-permission_feature_src_lib_web-user-feature-permission-detail_-c422ec"],{

/***/ 930122:
/*!*************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-detail/overview/overview.component.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionOverviewComponent": () => (/* binding */ WebUserFeaturePermissionOverviewComponent)
/* harmony export */ });
/* harmony import */ var _web_user_feature_permission_detail_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web-user-feature-permission-detail.store */ 273782);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_page_src_lib_web_ui_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../ui/page/src/lib/web-ui-page.component */ 119052);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../../ui/button/src/lib/web-ui-button.component */ 797800);








function WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 5)(2, "ui-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ui-button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("handler", function WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_1_Template_ui_button_handler_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.deleteItem(vm_r1.item));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-card-header", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("enableBackButton", false)("controlsTemplate", _r2);
  }
}
function WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Put Relevant Details Here");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_5_div_1_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.item);
  }
}
function WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-page", 9)(2, "div", 10)(3, "div", 11)(4, "div", 12)(5, "div", 13)(6, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 16)(11, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Feature Permission");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 18)(14, "dl", 19)(15, "div", 20)(16, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 20)(21, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Feature Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 20)(26, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Permission Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 20)(31, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "User Feature Permissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 16)(36, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "User");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 18)(39, "dl", 19)(40, "div", 20)(41, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Developer");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 20)(46, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Username");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 20)(51, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 20)(56, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "First Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 20)(61, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Last Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 20)(66, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Avatar Url");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 20)(71, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "Line 1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 20)(76, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Line 2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 20)(81, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "City");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "div", 20)(86, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "State");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 20)(91, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "Postal Code");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 20)(96, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "div", 20)(101, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "Bio");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 20)(106, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "div", 20)(111, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, "Date Of Birth");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 20)(116, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, "Cell Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div", 20)(121, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "Education");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "div", 20)(126, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](127, "Firm Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "div", 20)(131, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132, "Intakes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 20)(136, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](137, "Emails");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "div", 20)(141, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](142, "Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](143, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](144);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "div", 20)(146, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, "User Roles");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "div", 20)(151, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](152, "User Calendars");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](154);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](155, "div", 20)(156, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](157, "Documents");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](158, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "div", 20)(161, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](162, "Assigned Documents");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](164);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div", 20)(166, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](167, "Messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](169);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "div", 20)(171, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, "Chats");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](174);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](175, "div", 20)(176, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](177, "Navigations");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 20)(181, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, "Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](184);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "div", 20)(186, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](187, "Shortcuts");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](188, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](189);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "div", 20)(191, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "Case Notes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "div", 20)(196, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](197, "Team Users");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](199);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "div", 20)(201, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](202, "Tasks");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](204);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](205, "div", 20)(206, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](207, "User Features");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](209);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](210, "div", 20)(211, "dt", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](212, "User Feature Permissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "dd", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](214);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_18_0;
    let tmp_19_0;
    let tmp_20_0;
    let tmp_21_0;
    let tmp_22_0;
    let tmp_23_0;
    let tmp_24_0;
    let tmp_25_0;
    let tmp_26_0;
    let tmp_27_0;
    let tmp_28_0;
    let tmp_29_0;
    let tmp_30_0;
    let tmp_31_0;
    let tmp_32_0;
    let tmp_33_0;
    let tmp_34_0;
    let tmp_35_0;
    let tmp_36_0;
    let tmp_37_0;
    let tmp_38_0;
    let tmp_39_0;
    let tmp_40_0;
    let tmp_41_0;
    let tmp_42_0;
    let tmp_43_0;
    let tmp_44_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTitle", vm_r1.item == null ? null : vm_r1.item.name)("controlsTemplate", _r4)("disableHeaderPadding", true)("disableBodyPadding", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("min-height", 600, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", vm_r1.item.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_6_0 = vm_r1.item.name) !== null && tmp_6_0 !== undefined ? tmp_6_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_7_0 = vm_r1.item.featureId) !== null && tmp_7_0 !== undefined ? tmp_7_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_8_0 = vm_r1.item.permissionId) !== null && tmp_8_0 !== undefined ? tmp_8_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_9_0 = vm_r1.item.userFeaturePermissions) !== null && tmp_9_0 !== undefined ? tmp_9_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_10_0 = vm_r1.item.developer) !== null && tmp_10_0 !== undefined ? tmp_10_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_11_0 = vm_r1.item.username) !== null && tmp_11_0 !== undefined ? tmp_11_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_12_0 = vm_r1.item.password) !== null && tmp_12_0 !== undefined ? tmp_12_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_13_0 = vm_r1.item.firstName) !== null && tmp_13_0 !== undefined ? tmp_13_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_14_0 = vm_r1.item.lastName) !== null && tmp_14_0 !== undefined ? tmp_14_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_15_0 = vm_r1.item.avatarUrl) !== null && tmp_15_0 !== undefined ? tmp_15_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_16_0 = vm_r1.item.line1) !== null && tmp_16_0 !== undefined ? tmp_16_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_17_0 = vm_r1.item.line2) !== null && tmp_17_0 !== undefined ? tmp_17_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_18_0 = vm_r1.item.city) !== null && tmp_18_0 !== undefined ? tmp_18_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_19_0 = vm_r1.item.state) !== null && tmp_19_0 !== undefined ? tmp_19_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_20_0 = vm_r1.item.postalCode) !== null && tmp_20_0 !== undefined ? tmp_20_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_21_0 = vm_r1.item.phone) !== null && tmp_21_0 !== undefined ? tmp_21_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_22_0 = vm_r1.item.bio) !== null && tmp_22_0 !== undefined ? tmp_22_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_23_0 = vm_r1.item.status) !== null && tmp_23_0 !== undefined ? tmp_23_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_24_0 = vm_r1.item.dateOfBirth) !== null && tmp_24_0 !== undefined ? tmp_24_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_25_0 = vm_r1.item.cellPhone) !== null && tmp_25_0 !== undefined ? tmp_25_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_26_0 = vm_r1.item.education) !== null && tmp_26_0 !== undefined ? tmp_26_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_27_0 = vm_r1.item.firmId) !== null && tmp_27_0 !== undefined ? tmp_27_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_28_0 = vm_r1.item.intakes) !== null && tmp_28_0 !== undefined ? tmp_28_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_29_0 = vm_r1.item.emails) !== null && tmp_29_0 !== undefined ? tmp_29_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_30_0 = vm_r1.item.settings) !== null && tmp_30_0 !== undefined ? tmp_30_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_31_0 = vm_r1.item.userRoles) !== null && tmp_31_0 !== undefined ? tmp_31_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_32_0 = vm_r1.item.userCalendars) !== null && tmp_32_0 !== undefined ? tmp_32_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_33_0 = vm_r1.item.documents) !== null && tmp_33_0 !== undefined ? tmp_33_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_34_0 = vm_r1.item.assignedDocuments) !== null && tmp_34_0 !== undefined ? tmp_34_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_35_0 = vm_r1.item.messages) !== null && tmp_35_0 !== undefined ? tmp_35_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_36_0 = vm_r1.item.chats) !== null && tmp_36_0 !== undefined ? tmp_36_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_37_0 = vm_r1.item.navigations) !== null && tmp_37_0 !== undefined ? tmp_37_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_38_0 = vm_r1.item.notifications) !== null && tmp_38_0 !== undefined ? tmp_38_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_39_0 = vm_r1.item.shortcuts) !== null && tmp_39_0 !== undefined ? tmp_39_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_40_0 = vm_r1.item.caseNotes) !== null && tmp_40_0 !== undefined ? tmp_40_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_41_0 = vm_r1.item.teamUsers) !== null && tmp_41_0 !== undefined ? tmp_41_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_42_0 = vm_r1.item.tasks) !== null && tmp_42_0 !== undefined ? tmp_42_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_43_0 = vm_r1.item.userFeatures) !== null && tmp_43_0 !== undefined ? tmp_43_0 : "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_44_0 = vm_r1.item.userFeaturePermissions) !== null && tmp_44_0 !== undefined ? tmp_44_0 : "None");
  }
}
function WebUserFeaturePermissionOverviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_1_Template, 4, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_3_Template, 1, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_template_5_Template, 2, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebUserFeaturePermissionOverviewComponent_ng_container_0_ng_container_7_Template, 215, 46, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.item);
  }
}
class WebUserFeaturePermissionOverviewComponent {
  constructor(store) {
    this.store = store;
    this.vm$ = this.store.vm$;
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteUserFeaturePermissionEffect(item);
    }
  }
}
WebUserFeaturePermissionOverviewComponent.ɵfac = function WebUserFeaturePermissionOverviewComponent_Factory(t) {
  return new (t || WebUserFeaturePermissionOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_user_feature_permission_detail_store__WEBPACK_IMPORTED_MODULE_1__.WebUserFeaturePermissionDetailStore));
};
WebUserFeaturePermissionOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUserFeaturePermissionOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_user_feature_permission_detail_store__WEBPACK_IMPORTED_MODULE_1__.WebUserFeaturePermissionDetailStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["headerControls", ""], ["headerTemplate", ""], ["subTitleTemplate", ""], [1, "flex-none", "ml-auto", "space-x-3"], ["icon", "back-arrow", "variant", "white", "routerLink", "../../../", "label", "Back"], ["icon", "pencil", "variant", "white", "routerLink", "../edit", "label", "Edit"], ["icon", "trash", "variant", "danger", "label", "Delete", 3, "handler"], [3, "enableBackButton", "controlsTemplate"], [3, "headerTitle", "controlsTemplate", "disableHeaderPadding", "disableBodyPadding"], [1, "flex-1", "bg-white", "rounded-lg", "shadow", "md:px-2", "lg:px-0", "lg:col-span-9", "dark:bg-gray-800"], [1, "px-4", "py-5", "sm:p-0"], [1, "flex", "flex-row", "flex-wrap"], [1, "flex", "w-full", "py-4", "border-b", "border-gray-200", "lg:w-1/2", "sm:py-5", "sm:gap-4", "sm:px-6"], [1, "w-1/2", "text-sm", "font-bold", "text-gray-700"], [1, "w-1/2", "text-sm", "text-gray-900"], [1, "px-4", "py-5"], [1, "text-lg", "leading-6", "font-medium", "text-gray-900"], [1, "border-t", "border-gray-200", "px-4", "py-5"], [1, "grid", "grid-cols-2", "gap-x-4", "gap-y-8", "sm:grid-cols-3", "xl:grid-cols-4"], [1, "sm:col-span-1"], [1, "text-sm", "font-medium", "text-gray-500"], [1, "mt-1", "text-sm", "text-gray-900"]],
  template: function WebUserFeaturePermissionOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUserFeaturePermissionOverviewComponent_ng_container_0_Template, 8, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_3__.WebUiCardHeaderComponent, _ui_page_src_lib_web_ui_page_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_6__.WebUiButtonComponent, _angular_common__WEBPACK_IMPORTED_MODULE_2__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 588919:
/*!******************************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-detail/web-user-feature-permission-detail.component.ts ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionDetailComponent": () => (/* binding */ WebUserFeaturePermissionDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_user_feature_permission_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-user-feature-permission-detail.store */ 273782);
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
class WebUserFeaturePermissionDetailComponent {
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
      this.menuData = [{
        id: 'Details',
        title: 'User Feature Permission Details',
        type: 'group',
        children: [{
          id: 'details.overview',
          title: 'Overview',
          type: 'basic',
          link: `${routeString}/overview`
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
      this.store.deleteUserFeaturePermissionEffect(item);
    }
  }
}
WebUserFeaturePermissionDetailComponent.ɵfac = function WebUserFeaturePermissionDetailComponent_Factory(t) {
  return new (t || WebUserFeaturePermissionDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_user_feature_permission_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebUserFeaturePermissionDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebUserFeaturePermissionDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebUserFeaturePermissionDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebUserFeaturePermissionDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_user_feature_permission_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebUserFeaturePermissionDetailStore])],
  decls: 10,
  vars: 9,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"], ["mat-icon-button", "", 1, "ml-4", "md:hidden", "absolute", "left-4", "top-2", "sm:left-1", "sm:top-8", 3, "click"], [3, "svgIcon"]],
  template: function WebUserFeaturePermissionDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-drawer-content", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WebUserFeaturePermissionDetailComponent_Template_button_click_8_listener() {
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

/***/ 567298:
/*!***************************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-detail/web-user-feature-permission-detail.module.ts ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionDetailModule": () => (/* binding */ WebUserFeaturePermissionDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
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
/* harmony import */ var _web_user_feature_permission_detail_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./web-user-feature-permission-detail.component */ 588919);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./overview/overview.component */ 930122);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var libs_web_ui_forms_shared_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! libs/web/ui-forms-shared.module */ 271992);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);






















class WebUserFeaturePermissionDetailModule {}
WebUserFeaturePermissionDetailModule.ɵfac = function WebUserFeaturePermissionDetailModule_Factory(t) {
  return new (t || WebUserFeaturePermissionDetailModule)();
};
WebUserFeaturePermissionDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUserFeaturePermissionDetailModule
});
WebUserFeaturePermissionDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, libs_web_ui_forms_shared_module__WEBPACK_IMPORTED_MODULE_15__.UiFormsSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule.forChild([{
    path: '',
    component: _web_user_feature_permission_detail_component__WEBPACK_IMPORTED_MODULE_17__.WebUserFeaturePermissionDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_18__.WebUserFeaturePermissionOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_concrete_user-feature-permission_feature_src_lib_web-user-feature-permission-edit_we-2c355f").then(__webpack_require__.bind(__webpack_require__, /*! ../web-user-feature-permission-edit/web-user-feature-permission-edit.module */ 817424)).then(m => m.WebUserFeaturePermissionEditModule)
    }, {
      path: '',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_19__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_20__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUserFeaturePermissionDetailModule, {
    declarations: [_web_user_feature_permission_detail_component__WEBPACK_IMPORTED_MODULE_17__.WebUserFeaturePermissionDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_18__.WebUserFeaturePermissionOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, libs_web_ui_forms_shared_module__WEBPACK_IMPORTED_MODULE_15__.UiFormsSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_19__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_20__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 273782:
/*!**************************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-detail/web-user-feature-permission-detail.store.ts ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionDetailStore": () => (/* binding */ WebUserFeaturePermissionDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);







class WebUserFeaturePermissionDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
    this.loadUserFeaturePermissionEffect = this.effect(userFeaturePermissionId$ => userFeaturePermissionId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(userFeaturePermissionId => this.data.userUserFeaturePermission({
      userFeaturePermissionId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deleteUserFeaturePermissionEffect = this.effect(userFeaturePermission$ => userFeaturePermission$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(userFeaturePermission => this.data.userDeleteUserFeaturePermission({
      userFeaturePermissionId: userFeaturePermission.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.router.navigate(['/queues/user-feature-permissions']), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadUserFeaturePermissionEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('userFeaturePermissionId')));
  }
}
WebUserFeaturePermissionDetailStore.ɵfac = function WebUserFeaturePermissionDetailStore_Factory(t) {
  return new (t || WebUserFeaturePermissionDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
};
WebUserFeaturePermissionDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebUserFeaturePermissionDetailStore,
  factory: WebUserFeaturePermissionDetailStore.ɵfac
});

/***/ })

}]);