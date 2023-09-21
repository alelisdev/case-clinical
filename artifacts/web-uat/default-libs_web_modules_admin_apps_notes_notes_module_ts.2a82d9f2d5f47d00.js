"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_notes_notes_module_ts"],{

/***/ 343356:
/*!****************************************************************!*\
  !*** ./libs/web/@fuse/components/masonry/masonry.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseMasonryComponent": () => (/* binding */ FuseMasonryComponent)
/* harmony export */ });
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);






function FuseMasonryComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
const _c0 = function (a0) {
  return {
    $implicit: a0
  };
};
class FuseMasonryComponent {
  /**
   * Constructor
   */
  constructor(_fuseMediaWatcherService) {
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.items = [];
    this.distributedColumns = [];
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes) {
    // Columns
    if ('columns' in changes) {
      // Distribute the items
      this._distributeItems();
    }
    // Items
    if ('items' in changes) {
      // Distribute the items
      this._distributeItems();
    }
  }
  /**
   * After view init
   */
  ngAfterViewInit() {
    // Distribute the items for the first time
    this._distributeItems();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Distribute items into columns
   */
  _distributeItems() {
    // Return an empty array if there are no items
    if (this.items.length === 0) {
      this.distributedColumns = [];
      return;
    }
    // Prepare the distributed columns array
    this.distributedColumns = Array.from(Array(this.columns), item => ({
      items: []
    }));
    // Distribute the items to columns
    for (let i = 0; i < this.items.length; i++) {
      this.distributedColumns[i % this.columns].items.push(this.items[i]);
    }
  }
}
FuseMasonryComponent.ɵfac = function FuseMasonryComponent_Factory(t) {
  return new (t || FuseMasonryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_1__.FuseMediaWatcherService));
};
FuseMasonryComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FuseMasonryComponent,
  selectors: [["fuse-masonry"]],
  inputs: {
    columnsTemplate: "columnsTemplate",
    columns: "columns",
    items: "items"
  },
  exportAs: ["fuseMasonry"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 2,
  vars: 4,
  consts: [[1, "flex"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function FuseMasonryComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FuseMasonryComponent_ng_container_1_Template, 1, 0, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx.columnsTemplate)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, ctx.distributedColumns));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_3__.fuseAnimations
  }
});

/***/ }),

/***/ 101992:
/*!*************************************************************!*\
  !*** ./libs/web/@fuse/components/masonry/masonry.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseMasonryModule": () => (/* binding */ FuseMasonryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _fuse_components_masonry_masonry_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fuse/components/masonry/masonry.component */ 343356);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);



class FuseMasonryModule {}
FuseMasonryModule.ɵfac = function FuseMasonryModule_Factory(t) {
  return new (t || FuseMasonryModule)();
};
FuseMasonryModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FuseMasonryModule
});
FuseMasonryModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FuseMasonryModule, {
    declarations: [_fuse_components_masonry_masonry_component__WEBPACK_IMPORTED_MODULE_2__.FuseMasonryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
    exports: [_fuse_components_masonry_masonry_component__WEBPACK_IMPORTED_MODULE_2__.FuseMasonryComponent]
  });
})();

/***/ }),

/***/ 415888:
/*!************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/details/details.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesDetailsComponent": () => (/* binding */ NotesDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_notes_notes_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/notes.service */ 47309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 224006);














function NotesDetailsComponent_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6)(2, "div", 7)(3, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.removeImage(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:trash");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", note_r1.image, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
const _c0 = function (a0) {
  return {
    "text-secondary line-through": a0
  };
};
function NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 17)(2, "mat-checkbox", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template_mat_checkbox_ngModelChange_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const task_r13 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](task_r13.completed = $event);
    })("change", function NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template_mat_checkbox_change_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const task_r13 = restoredCtx.$implicit;
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r16.updateTaskOnNote(note_r1, task_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template_input_ngModelChange_3_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const task_r13 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](task_r13.content = $event);
    })("input", function NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template_input_input_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const task_r13 = restoredCtx.$implicit;
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r19.updateTaskOnNote(note_r1, task_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template_mat_icon_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const task_r13 = restoredCtx.$implicit;
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r21.removeTaskFromNote(note_r1, task_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const task_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("ngModel", task_r13.completed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c0, task_r13.completed))("placeholder", "Task")("ngModel", task_r13.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:x");
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesDetailsComponent_ng_container_1_ng_container_7_ng_container_2_Template, 5, 8, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown.enter", function NotesDetailsComponent_ng_container_1_ng_container_7_Template_input_keydown_enter_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      ctx_r23.addTaskToNote(note_r1, _r12.value);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r12.value = "");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", note_r1.tasks)("ngForTrackBy", ctx_r3.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Add task");
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 22)(2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_8_ng_container_2_Template_mat_icon_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31);
      const label_r28 = restoredCtx.$implicit;
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r29.toggleLabelOnNote(note_r1, label_r28));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", label_r28.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:x-circle");
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesDetailsComponent_ng_container_1_ng_container_8_ng_container_2_Template, 5, 2, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", note_r1.labels)("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 24)(2, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_9_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r33.createNote(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Save ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("disabled", !note_r1.title && !note_r1.content);
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_10_ng_container_14_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_10_ng_container_14_ng_container_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45);
      const label_r42 = restoredCtx.$implicit;
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r43.toggleLabelOnNote(note_r1, label_r42));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-checkbox", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r42 = ctx.$implicit;
    const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3).ngIf;
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("checked", ctx_r41.isNoteHasLabel(note_r1, label_r42));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](label_r42.title);
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_10_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NotesDetailsComponent_ng_container_1_ng_container_10_ng_container_14_ng_container_1_Template, 6, 3, "ng-container", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const labels_r40 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", labels_r40);
  }
}
function NotesDetailsComponent_ng_container_1_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 26)(2, "div", 27)(3, "div")(4, "input", 28, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function NotesDetailsComponent_ng_container_1_ng_container_10_Template_input_change_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r47.uploadImage(note_r1, _r37.files));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_10_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r50.addTasksToNote(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-menu", null, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, NotesDetailsComponent_ng_container_1_ng_container_10_ng_container_14_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_10_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r52.toggleArchiveOnNote(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesDetailsComponent_ng_container_1_ng_container_10_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const note_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r54.deleteNote(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](13);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("multiple", false)("accept", "image/jpeg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:photograph");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:clipboard-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:tag");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 9, ctx_r6.labels$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:archive");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:trash");
  }
}
function NotesDetailsComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NotesDetailsComponent_ng_container_1_ng_container_1_Template, 6, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "div")(4, "input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotesDetailsComponent_ng_container_1_Template_input_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r57);
      const note_r1 = restoredCtx.ngIf;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](note_r1.title = $event);
    })("input", function NotesDetailsComponent_ng_container_1_Template_input_input_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r57);
      const note_r1 = restoredCtx.ngIf;
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r58.updateNoteDetails(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4)(6, "textarea", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotesDetailsComponent_ng_container_1_Template_textarea_ngModelChange_6_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r57);
      const note_r1 = restoredCtx.ngIf;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](note_r1.content = $event);
    })("input", function NotesDetailsComponent_ng_container_1_Template_textarea_input_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r57);
      const note_r1 = restoredCtx.ngIf;
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r60.updateNoteDetails(note_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, NotesDetailsComponent_ng_container_1_ng_container_7_Template, 7, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, NotesDetailsComponent_ng_container_1_ng_container_8_Template, 3, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, NotesDetailsComponent_ng_container_1_ng_container_9_Template, 4, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, NotesDetailsComponent_ng_container_1_ng_container_10_Template, 22, 11, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r1.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Title")("ngModel", note_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Note")("ngModel", note_r1.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r1.tasks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r1.labels && note_r1.labels.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !note_r1.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r1.id);
  }
}
class NotesDetailsComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _data, _notesService, _matDialogRef) {
    this._changeDetectorRef = _changeDetectorRef;
    this._data = _data;
    this._notesService = _notesService;
    this._matDialogRef = _matDialogRef;
    this.noteChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Edit
    if (this._data.note.id) {
      // Request the data from the server
      this._notesService.getNoteById(this._data.note.id).subscribe();
      // Get the note
      this.note$ = this._notesService.note$;
    }
    // Add
    else {
      // Create an empty note
      const note = {
        id: null,
        title: '',
        content: '',
        tasks: null,
        image: null,
        reminder: null,
        labels: [],
        archived: false,
        createdAt: null,
        updatedAt: null
      };
      this.note$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(note);
    }
    // Get the labels
    this.labels$ = this._notesService.labels$;
    // Subscribe to note updates
    this.noteChanged.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(note => this._notesService.updateNote(note))).subscribe(() => {
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
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Create a new note
   *
   * @param note
   */
  createNote(note) {
    this._notesService.createNote(note).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
      // Get the note
      this.note$ = this._notesService.note$;
    })).subscribe();
  }
  /**
   * Upload image to given note
   *
   * @param note
   * @param fileList
   */
  uploadImage(note, fileList) {
    // Return if canceled
    if (!fileList.length) {
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];
    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }
    this._readAsDataURL(file).then(data => {
      // Update the image
      note.image = data;
      // Update the note
      this.noteChanged.next(note);
    });
  }
  /**
   * Remove the image on the given note
   *
   * @param note
   */
  removeImage(note) {
    note.image = null;
    // Update the note
    this.noteChanged.next(note);
  }
  /**
   * Add an empty tasks array to note
   *
   * @param note
   */
  addTasksToNote(note) {
    if (!note.tasks) {
      note.tasks = [];
    }
  }
  /**
   * Add task to the given note
   *
   * @param note
   * @param task
   */
  addTaskToNote(note, task) {
    if (task.trim() === '') {
      return;
    }
    // Add the task
    this._notesService.addTask(note, task).subscribe();
  }
  /**
   * Remove the given task from given note
   *
   * @param note
   * @param task
   */
  removeTaskFromNote(note, task) {
    // Remove the task
    note.tasks = note.tasks.filter(item => item.id !== task.id);
    // Update the note
    this.noteChanged.next(note);
  }
  /**
   * Update the given task on the given note
   *
   * @param note
   * @param task
   */
  updateTaskOnNote(note, task) {
    // If the task is already available on the item
    if (task.id) {
      // Update the note
      this.noteChanged.next(note);
    }
  }
  /**
   * Is the given note has the given label
   *
   * @param note
   * @param label
   */
  isNoteHasLabel(note, label) {
    return !!note.labels.find(item => item.id === label.id);
  }
  /**
   * Toggle the given label on the given note
   *
   * @param note
   * @param label
   */
  toggleLabelOnNote(note, label) {
    // If the note already has the label
    if (this.isNoteHasLabel(note, label)) {
      note.labels = note.labels.filter(item => item.id !== label.id);
    }
    // Otherwise
    else {
      note.labels.push(label);
    }
    // Update the note
    this.noteChanged.next(note);
  }
  /**
   * Toggle archived status on the given note
   *
   * @param note
   */
  toggleArchiveOnNote(note) {
    note.archived = !note.archived;
    // Update the note
    this.noteChanged.next(note);
    // Close the dialog
    this._matDialogRef.close();
  }
  /**
   * Update the note details
   *
   * @param note
   */
  updateNoteDetails(note) {
    this.noteChanged.next(note);
  }
  /**
   * Delete the given note
   *
   * @param note
   */
  deleteNote(note) {
    this._notesService.deleteNote(note).subscribe(isDeleted => {
      // Return if the note wasn't deleted...
      if (!isDeleted) {
        return;
      }
      // Close the dialog
      this._matDialogRef.close();
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
NotesDetailsComponent.ɵfac = function NotesDetailsComponent_Factory(t) {
  return new (t || NotesDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_notes_notes_service__WEBPACK_IMPORTED_MODULE_8__.NotesService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogRef));
};
NotesDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NotesDetailsComponent,
  selectors: [["notes-details"]],
  decls: 3,
  vars: 3,
  consts: [[1, "flex", "flex-col", "flex-auto", "md:w-160", "md:min-w-160", "-m-6"], [4, "ngIf"], [1, "m-4"], [1, "w-full", "p-2", "text-2xl", 3, "placeholder", "ngModel", "ngModelChange", "input"], [1, "flex", "w-full", "py-5", "px-2"], ["matTextareaAutosize", "", 1, "w-full", 3, "placeholder", "ngModel", "ngModelChange", "input"], [1, "relative", "w-full"], [1, "absolute", "right-0", "bottom-0", "p-4"], ["mat-icon-button", "", 3, "click"], [1, "text-white", 3, "svgIcon"], [1, "w-full", "object-cover", 3, "src"], [1, "mx-2", "mt-4", "space-y-1.5"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "items-center"], [1, "-ml-0.5", "icon-size-5", "text-hint", 3, "svgIcon"], [1, "w-full", "ml-1.5", "px-1", "py-0.5", 3, "placeholder", "keydown.enter"], ["newTaskInput", ""], [1, "group", "flex", "items-center"], [1, "flex", "items-center", 3, "color", "ngModel", "ngModelChange", "change"], [1, "w-full", "px-1", "py-0.5", 3, "ngClass", "placeholder", "ngModel", "ngModelChange", "input"], [1, "hidden", "group-hover:flex", "ml-auto", "icon-size-5", "cursor-pointer", 3, "svgIcon", "click"], [1, "flex", "flex-wrap", "items-center", "mx-1", "mt-6"], [1, "flex", "items-center", "m-1", "py-0.5", "px-3", "rounded-full", "text-sm", "font-medium", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700"], [1, "ml-1", "icon-size-4", "cursor-pointer", 3, "svgIcon", "click"], [1, "flex", "items-center", "justify-end", "mt-4"], ["mat-flat-button", "", 3, "color", "disabled", "click"], [1, "flex", "items-center", "justify-between", "mt-4"], [1, "flex", "items-center", "space-x-2"], ["id", "image-file-input", "type", "file", 1, "absolute", "h-0", "w-0", "opacity-0", "invisible", "pointer-events-none", 3, "multiple", "accept", "change"], ["imageFileInput", ""], ["for", "image-file-input", "matRipple", "", 1, "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "cursor-pointer", "hover:bg-gray-400", "hover:bg-opacity-20", "dark:hover:bg-black", "dark:hover:bg-opacity-5"], [3, "svgIcon"], ["mat-icon-button", "", 3, "matMenuTriggerFor"], ["labelsMenu", "matMenu"], ["mat-flat-button", "", "matDialogClose", ""], [4, "ngFor", "ngForOf"], ["mat-menu-item", "", 3, "click"], ["disableRipple", "", 1, "flex", "items-center", "pointer-events-none", 3, "color", "checked"], [1, "ml-1", "leading-5"]],
  template: function NotesDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NotesDetailsComponent_ng_container_1_Template, 11, 9, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx.note$));
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__.MatCheckbox, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogClose, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuTrigger, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 609769:
/*!**********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/labels/labels.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesLabelsComponent": () => (/* binding */ NotesLabelsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_notes_notes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/notes.service */ 47309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 224006);












function NotesLabelsComponent_ng_container_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 13)(2, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesLabelsComponent_ng_container_12_ng_container_1_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const label_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.deleteLabel(label_r4.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotesLabelsComponent_ng_container_12_ng_container_1_Template_input_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const label_r4 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](label_r4.title = $event);
    })("input", function NotesLabelsComponent_ng_container_12_ng_container_1_Template_input_input_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const label_r4 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.updateLabel(label_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autocomplete", "off")("ngModel", label_r4.title);
  }
}
function NotesLabelsComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NotesLabelsComponent_ng_container_12_ng_container_1_Template, 5, 3, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const labels_r2 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", labels_r2)("ngForTrackBy", ctx_r1.trackByFn);
  }
}
class NotesLabelsComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _notesService) {
    this._changeDetectorRef = _changeDetectorRef;
    this._notesService = _notesService;
    this.labelChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the labels
    this.labels$ = this._notesService.labels$;
    // Subscribe to label updates
    this.labelChanged.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(label => label.title.trim() !== ''), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(label => this._notesService.updateLabel(label))).subscribe(() => {
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
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Add label
   *
   * @param title
   */
  addLabel(title) {
    this._notesService.addLabel(title).subscribe();
  }
  /**
   * Update label
   */
  updateLabel(label) {
    this.labelChanged.next(label);
  }
  /**
   * Delete label
   *
   * @param id
   */
  deleteLabel(id) {
    this._notesService.deleteLabel(id).subscribe(() => {
      // Mark for check
      this._changeDetectorRef.markForCheck();
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
NotesLabelsComponent.ɵfac = function NotesLabelsComponent_Factory(t) {
  return new (t || NotesLabelsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_notes_notes_service__WEBPACK_IMPORTED_MODULE_6__.NotesService));
};
NotesLabelsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NotesLabelsComponent,
  selectors: [["notes-labels"]],
  decls: 14,
  vars: 10,
  consts: [[1, "flex", "flex-col", "flex-auto", "w-80", "min-w-80", "p-2", "md:p-4"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-semibold"], ["matDialogClose", "", "mat-icon-button", ""], [3, "svgIcon"], [1, "fuse-mat-dense", "w-full", "mt-8", 3, "floatLabel"], ["name", "new-label", "matInput", "", 3, "autocomplete", "placeholder"], ["newLabelInput", ""], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], [1, "flex", "flex-col", "mt-4"], [4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "fuse-mat-dense", "w-full"], ["mat-icon-button", "", "matPrefix", "", 3, "click"], ["required", "", "matInput", "", 3, "autocomplete", "ngModel", "ngModelChange", "input"]],
  template: function NotesLabelsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Edit labels");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "input", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesLabelsComponent_Template_button_click_9_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
        ctx.addLabel(_r0.value);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.value = "");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "mat-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, NotesLabelsComponent_ng_container_12_Template, 2, 2, "ng-container", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("floatLabel", "always");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autocomplete", "off")("placeholder", "Create new label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("invisible", _r0.value.trim() === "");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](13, 8, ctx.labels$));
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogClose, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 478562:
/*!******************************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/list/list.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesListComponent": () => (/* binding */ NotesListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 739841);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 371884);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var libs_web_modules_admin_apps_notes_details_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/details/details.component */ 415888);
/* harmony import */ var libs_web_modules_admin_apps_notes_labels_labels_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/labels/labels.component */ 609769);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es */ 445840);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var libs_web_modules_admin_apps_notes_notes_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/notes.service */ 47309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_masonry_masonry_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @fuse/components/masonry/masonry.component */ 343356);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 836895);




















const _c0 = function (a0, a1) {
  return {
    "bg-gray-200 dark:bg-gray-700 text-primary dark:text-primary-400": a0,
    "text-hint hover:bg-hover": a1
  };
};
function NotesListComponent_ng_container_14_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_ng_container_14_ng_container_1_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const label_r10 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r11.filterByLabel(label_r10.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](4, _c0, "label:" + label_r10.id === ctx_r9.filterStatus, "label:" + label_r10.id !== ctx_r9.filterStatus))("matRippleDisabled", "label:" + label_r10.id === ctx_r9.filterStatus);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:tag");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](label_r10.title);
  }
}
function NotesListComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NotesListComponent_ng_container_14_ng_container_1_Template, 5, 7, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const labels_r8 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", labels_r8)("ngForTrackBy", ctx_r1.trackByFn);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", note_r21.image, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", note_r21.title, " ");
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("text-xl", note_r21.content.length < 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", note_r21.content, " ");
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_ng_container_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
  }
}
const _c1 = function (a0) {
  return {
    "text-secondary line-through": a0
  };
};
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_ng_container_2_ng_container_2_Template, 3, 0, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_ng_container_2_ng_container_3_Template, 2, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const task_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !task_r31.completed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r31.completed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c1, task_r31.completed));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", task_r31.content, " ");
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_ng_container_2_Template, 6, 6, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", note_r21.tasks)("ngForTrackBy", ctx_r25.trackByFn);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r36 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", label_r36.title, " ");
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_7_ng_container_2_Template, 3, 1, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", note_r21.labels)("ngForTrackBy", ctx_r26.trackByFn);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r39);
      const note_r21 = restoredCtx.$implicit;
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r38.openNoteDialog(note_r21));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_2_Template, 2, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_4_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_5_Template, 3, 3, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_6_Template, 3, 2, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_ng_container_7_Template, 3, 2, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const note_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r21.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r21.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r21.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r21.tasks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", note_r21.labels);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_ng_container_2_Template, 8, 5, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const column_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", column_r19.items)("ngForTrackBy", ctx_r18.trackByFn);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_ng_container_0_Template, 3, 2, "ng-container", 29);
  }
  if (rf & 2) {
    const columns_r17 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", columns_r17)("ngForTrackBy", ctx_r16.trackByFn);
  }
}
function NotesListComponent_ng_container_34_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "fuse-masonry", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NotesListComponent_ng_container_34_ng_container_1_ng_template_2_Template, 1, 2, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    const notes_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("items", notes_r13)("columns", ctx_r14.masonryColumns)("columnsTemplate", _r15);
  }
}
function NotesListComponent_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NotesListComponent_ng_container_34_ng_container_1_Template, 4, 3, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const notes_r13 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", notes_r13.length)("ngIfElse", _r6);
  }
}
function NotesListComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44)(1, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function NotesListComponent_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "There are no notes!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:file_hide");
  }
}
class NotesListComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _fuseMediaWatcherService, _matDialog, _notesService) {
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this._matDialog = _matDialog;
    this._notesService = _notesService;
    this.drawerMode = 'side';
    this.drawerOpened = true;
    this.filter$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject('notes');
    this.searchQuery$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
    this.masonryColumns = 4;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get the filter status
   */
  get filterStatus() {
    return this.filter$.value;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Request the data from the server
    this._notesService.getLabels().subscribe();
    this._notesService.getNotes().subscribe();
    // Get labels
    this.labels$ = this._notesService.labels$;
    // Get notes
    this.notes$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this._notesService.notes$, this.filter$, this.searchQuery$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([notes, filter, searchQuery]) => {
      if (!notes || !notes.length) {
        return;
      }
      // Store the filtered notes
      let filteredNotes = notes;
      // Filter by query
      if (searchQuery) {
        searchQuery = searchQuery.trim().toLowerCase();
        filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(searchQuery) || note.content.toLowerCase().includes(searchQuery));
      }
      // Show all
      if (filter === 'notes') {
        // Do nothing
      }
      // Show archive
      const isArchive = filter === 'archived';
      filteredNotes = filteredNotes.filter(note => note.archived === isArchive);
      // Filter by label
      if (filter.startsWith('label:')) {
        const labelId = filter.split(':')[1];
        filteredNotes = filteredNotes.filter(note => !!note.labels.find(item => item.id === labelId));
      }
      return filteredNotes;
    }));
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened if the given breakpoint is active
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
      // Set the masonry columns
      //
      // This if block structured in a way so that only the
      // biggest matching alias will be used to set the column
      // count.
      if (matchingAliases.includes('xl')) {
        this.masonryColumns = 5;
      } else if (matchingAliases.includes('lg')) {
        this.masonryColumns = 4;
      } else if (matchingAliases.includes('md')) {
        this.masonryColumns = 3;
      } else if (matchingAliases.includes('sm')) {
        this.masonryColumns = 2;
      } else {
        this.masonryColumns = 1;
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
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Add a new note
   */
  addNewNote() {
    this._matDialog.open(libs_web_modules_admin_apps_notes_details_details_component__WEBPACK_IMPORTED_MODULE_7__.NotesDetailsComponent, {
      autoFocus: false,
      data: {
        note: {}
      }
    });
  }
  /**
   * Open the edit labels dialog
   */
  openEditLabelsDialog() {
    this._matDialog.open(libs_web_modules_admin_apps_notes_labels_labels_component__WEBPACK_IMPORTED_MODULE_8__.NotesLabelsComponent, {
      autoFocus: false
    });
  }
  /**
   * Open the note dialog
   */
  openNoteDialog(note) {
    this._matDialog.open(libs_web_modules_admin_apps_notes_details_details_component__WEBPACK_IMPORTED_MODULE_7__.NotesDetailsComponent, {
      autoFocus: false,
      data: {
        note: (0,lodash_es__WEBPACK_IMPORTED_MODULE_9__["default"])(note)
      }
    });
  }
  /**
   * Filter by archived
   */
  filterByArchived() {
    this.filter$.next('archived');
  }
  /**
   * Filter by label
   *
   * @param labelId
   */
  filterByLabel(labelId) {
    const filterValue = `label:${labelId}`;
    this.filter$.next(filterValue);
  }
  /**
   * Filter by query
   *
   * @param query
   */
  filterByQuery(query) {
    this.searchQuery$.next(query);
  }
  /**
   * Reset filter
   */
  resetFilter() {
    this.filter$.next('notes');
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
NotesListComponent.ɵfac = function NotesListComponent_Factory(t) {
  return new (t || NotesListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_10__.FuseMediaWatcherService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_notes_notes_service__WEBPACK_IMPORTED_MODULE_12__.NotesService));
};
NotesListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NotesListComponent,
  selectors: [["notes-list"]],
  decls: 40,
  vars: 28,
  consts: [[1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex-auto", "h-full", "bg-card", "dark:bg-transparent"], [1, "w-2/3", "sm:w-72", "lg:w-56", "border-r-0", "bg-default", 3, "mode", "opened"], ["drawer", ""], [1, "p-6", "lg:py-8", "lg:pl-4", "lg:pr-0"], [1, "space-y-2"], ["matRipple", "", 1, "relative", "flex", "items-center", "py-2", "px-4", "font-medium", "rounded-full", "cursor-pointer", 3, "ngClass", "matRippleDisabled", "click"], [1, "text-current", 3, "svgIcon"], [1, "ml-3", "leading-5", "select-none", "text-default"], [4, "ngIf"], ["matRipple", "", 1, "relative", "flex", "items-center", "py-2", "px-4", "font-medium", "rounded-full", "cursor-pointer", "hover:bg-hover", 3, "click"], [1, "text-hint", 3, "svgIcon"], [1, "ml-3", "leading-5", "select-none"], [1, "flex", "flex-col", "bg-gray-100", "dark:bg-transparent"], [1, "flex", "flex-col", "flex-auto", "p-6", "md:p-8"], [1, "flex", "items-center"], [1, "flex", "items-center", "flex-auto"], ["mat-icon-button", "", 1, "flex", "lg:hidden", "-ml-2", 3, "click"], [3, "svgIcon"], [1, "fuse-mat-rounded", "fuse-mat-dense", "fuse-mat-no-subscript", "flex-auto", "ml-4", "lg:ml-0"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "autocomplete", "placeholder", "input"], ["searchInput", ""], ["mat-flat-button", "", 1, "ml-4", "px-1", "sm:px-4", "min-w-10", 3, "color", "click"], [1, "icon-size-5", 3, "svgIcon"], [1, "hidden", "sm:inline-block", "ml-2"], [4, "ngIf", "ngIfElse"], ["loading", ""], ["noNotes", ""], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "-mx-2", "mt-8", 3, "items", "columns", "columnsTemplate"], ["columnsTemplate", ""], [1, "flex-1", "px-2", "space-y-4"], [1, "flex", "flex-col", "shadow", "rounded-2xl", "overflow-hidden", "cursor-pointer", "bg-card", 3, "click"], [1, "flex", "flex-auto", "flex-col", "p-6", "space-y-4"], [1, "w-full", "object-cover", 3, "src"], [1, "font-semibold", "line-clamp-3"], [1, "space-y-1.5"], [1, "ml-1.5", "leading-5", 3, "ngClass"], [1, "flex", "items-center", "justify-center", "w-5", "h-5"], [1, "w-4", "h-4", "rounded-full", "border-2"], [1, "text-hint", "icon-size-5", 3, "svgIcon"], [1, "flex", "flex-wrap", "items-center", "-m-1"], [1, "m-1", "py-0.5", "px-3", "rounded-full", "text-sm", "font-medium", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700"], [1, "flex", "flex-auto", "flex-col", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"], [1, "icon-size-24", 3, "svgIcon"]],
  template: function NotesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_Template_div_click_6_listener() {
        return ctx.resetFilter();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Notes");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_Template_div_click_10_listener() {
        return ctx.filterByArchived();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Archive");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, NotesListComponent_ng_container_14_Template, 2, 2, "ng-container", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_Template_div_click_16_listener() {
        return ctx.openEditLabelsDialog();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "mat-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Edit labels");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-drawer-content", 13)(21, "div", 14)(22, "div", 15)(23, "div", 16)(24, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_Template_button_click_24_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "mat-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-form-field", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "mat-icon", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "input", 21, 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function NotesListComponent_Template_input_input_28_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](29);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.filterByQuery(_r2.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NotesListComponent_Template_button_click_30_listener() {
        return ctx.addNewNote();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "mat-icon", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "New note");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, NotesListComponent_ng_container_34_Template, 2, 2, "ng-container", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](35, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, NotesListComponent_ng_template_36_Template, 3, 0, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, NotesListComponent_ng_template_38_Template, 4, 1, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](22, _c0, ctx.filterStatus === "notes", ctx.filterStatus !== "notes"))("matRippleDisabled", ctx.filterStatus === "notes");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:pencil-alt");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](25, _c0, ctx.filterStatus === "archived", ctx.filterStatus !== "archived"))("matRippleDisabled", ctx.filterStatus === "archived");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:archive");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 18, ctx.labels$));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:pencil");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autocomplete", "off")("placeholder", "Search notes");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](35, 20, ctx.notes$))("ngIfElse", _r4);
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatRipple, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__.MatDrawerContent, _fuse_components_masonry_masonry_component__WEBPACK_IMPORTED_MODULE_19__.FuseMasonryComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 50822:
/*!**************************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/notes.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesComponent": () => (/* binding */ NotesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class NotesComponent {
  /**
   * Constructor
   */
  constructor() {}
}
NotesComponent.ɵfac = function NotesComponent_Factory(t) {
  return new (t || NotesComponent)();
};
NotesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NotesComponent,
  selectors: [["notes"]],
  decls: 1,
  vars: 0,
  template: function NotesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 43491:
/*!***********************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/notes.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesModule": () => (/* binding */ NotesModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_masonry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fuse/components/masonry */ 101992);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var libs_web_modules_admin_apps_notes_notes_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/notes.component */ 50822);
/* harmony import */ var libs_web_modules_admin_apps_notes_details_details_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/details/details.component */ 415888);
/* harmony import */ var libs_web_modules_admin_apps_notes_list_list_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/list/list.component */ 478562);
/* harmony import */ var libs_web_modules_admin_apps_notes_labels_labels_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/labels/labels.component */ 609769);
/* harmony import */ var libs_web_modules_admin_apps_notes_notes_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/notes.routing */ 390261);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);



















class NotesModule {}
NotesModule.ɵfac = function NotesModule_Factory(t) {
  return new (t || NotesModule)();
};
NotesModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: NotesModule
});
NotesModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(libs_web_modules_admin_apps_notes_notes_routing__WEBPACK_IMPORTED_MODULE_2__.notesRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRippleModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavModule, _fuse_components_masonry__WEBPACK_IMPORTED_MODULE_12__.FuseMasonryModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_13__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NotesModule, {
    declarations: [libs_web_modules_admin_apps_notes_notes_component__WEBPACK_IMPORTED_MODULE_14__.NotesComponent, libs_web_modules_admin_apps_notes_details_details_component__WEBPACK_IMPORTED_MODULE_15__.NotesDetailsComponent, libs_web_modules_admin_apps_notes_list_list_component__WEBPACK_IMPORTED_MODULE_16__.NotesListComponent, libs_web_modules_admin_apps_notes_labels_labels_component__WEBPACK_IMPORTED_MODULE_17__.NotesLabelsComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRippleModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavModule, _fuse_components_masonry__WEBPACK_IMPORTED_MODULE_12__.FuseMasonryModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_13__.SharedModule]
  });
})();

/***/ }),

/***/ 390261:
/*!************************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/notes.routing.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "notesRoutes": () => (/* binding */ notesRoutes)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_notes_notes_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/notes.component */ 50822);
/* harmony import */ var libs_web_modules_admin_apps_notes_list_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/notes/list/list.component */ 478562);


const notesRoutes = [{
  path: '',
  component: libs_web_modules_admin_apps_notes_notes_component__WEBPACK_IMPORTED_MODULE_0__.NotesComponent,
  children: [{
    path: '',
    component: libs_web_modules_admin_apps_notes_list_list_component__WEBPACK_IMPORTED_MODULE_1__.NotesListComponent
  }]
}];

/***/ }),

/***/ 47309:
/*!************************************************************!*\
  !*** ./libs/web/modules/admin/apps/notes/notes.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesService": () => (/* binding */ NotesService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es */ 445840);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 80529);





class NotesService {
  /**
   * Constructor
   */
  constructor(_httpClient) {
    this._httpClient = _httpClient;
    // Private
    this._labels = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._note = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._notes = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for labels
   */
  get labels$() {
    return this._labels.asObservable();
  }
  /**
   * Getter for notes
   */
  get notes$() {
    return this._notes.asObservable();
  }
  /**
   * Getter for note
   */
  get note$() {
    return this._note.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get labels
   */
  getLabels() {
    return this._httpClient.get('api/apps/notes/labels').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._labels.next(response);
    }));
  }
  /**
   * Add label
   *
   * @param title
   */
  addLabel(title) {
    return this._httpClient.post('api/apps/notes/labels', {
      title
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(labels => {
      // Update the labels
      this._labels.next(labels);
    }));
  }
  /**
   * Update label
   *
   * @param label
   */
  updateLabel(label) {
    return this._httpClient.patch('api/apps/notes/labels', {
      label
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(labels => {
      // Update the notes
      this.getNotes().subscribe();
      // Update the labels
      this._labels.next(labels);
    }));
  }
  /**
   * Delete a label
   *
   * @param id
   */
  deleteLabel(id) {
    return this._httpClient.delete('api/apps/notes/labels', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(labels => {
      // Update the notes
      this.getNotes().subscribe();
      // Update the labels
      this._labels.next(labels);
    }));
  }
  /**
   * Get notes
   */
  getNotes() {
    return this._httpClient.get('api/apps/notes/all').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._notes.next(response);
    }));
  }
  /**
   * Get note by id
   */
  getNoteById(id) {
    return this._notes.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(notes => {
      // Find within the folders and files
      const note = notes.find(value => value.id === id) || null;
      // Update the note
      this._note.next(note);
      // Return the note
      return note;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(note => {
      if (!note) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)('Could not found the note with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(note);
    }));
  }
  /**
   * Add task to the given note
   *
   * @param note
   * @param task
   */
  addTask(note, task) {
    return this._httpClient.post('api/apps/notes/tasks', {
      note,
      task
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.getNotes().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.getNoteById(note.id)))));
  }
  /**
   * Create note
   *
   * @param note
   */
  createNote(note) {
    return this._httpClient.post('api/apps/notes', {
      note
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(response => this.getNotes().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.getNoteById(response.id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => response))))));
  }
  /**
   * Update the note
   *
   * @param note
   */
  updateNote(note) {
    // Clone the note to prevent accidental reference based updates
    const updatedNote = (0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(note);
    // Before sending the note to the server, handle the labels
    if (updatedNote.labels.length) {
      updatedNote.labels = updatedNote.labels.map(label => label.id);
    }
    return this._httpClient.patch('api/apps/notes', {
      updatedNote
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      // Update the notes
      this.getNotes().subscribe();
    }));
  }
  /**
   * Delete the note
   *
   * @param note
   */
  deleteNote(note) {
    return this._httpClient.delete('api/apps/notes', {
      params: {
        id: note.id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(isDeleted => {
      // Update the notes
      this.getNotes().subscribe();
      // Return the deleted status
      return isDeleted;
    }));
  }
}
NotesService.ɵfac = function NotesService_Factory(t) {
  return new (t || NotesService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
};
NotesService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: NotesService,
  factory: NotesService.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);