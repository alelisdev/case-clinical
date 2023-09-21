"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_prior-authorization-procedure-code_feature_src_lib_web-prior-authorization-procedure-4c856a"],{

/***/ 457490:
/*!**************************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/feature/src/lib/web-prior-authorization-procedure-code-list/web-prior-authorization-procedure-code-list.component.ts ***!
  \**************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationProcedureCodeListComponent": () => (/* binding */ WebPriorAuthorizationProcedureCodeListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_prior_authorization_procedure_code_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/prior-authorization-procedure-code/shared */ 990749);
/* harmony import */ var _case_clinical_web_prior_authorization_procedure_code_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/prior-authorization-procedure-code/ui */ 39652);
/* harmony import */ var _case_clinical_web_cost_category_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/cost-category/shared */ 520096);
/* harmony import */ var _case_clinical_web_procedure_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/procedure/shared */ 632277);
/* harmony import */ var _case_clinical_web_prior_authorization_request_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/prior-authorization-request/shared */ 212129);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);















function WebPriorAuthorizationProcedureCodeListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebPriorAuthorizationProcedureCodeListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebPriorAuthorizationProcedureCodeListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.excelDataHasBeenPopulated($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r2 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.priorAuthorizationProcedureCodes)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebPriorAuthorizationProcedureCodeListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebPriorAuthorizationProcedureCodeListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebPriorAuthorizationProcedureCodeListComponent {
  constructor(store, costCategoryFeatureStore, procedureFeatureStore, priorAuthorizationRequestFeatureStore) {
    this.store = store;
    this.costCategoryFeatureStore = costCategoryFeatureStore;
    this.procedureFeatureStore = procedureFeatureStore;
    this.priorAuthorizationRequestFeatureStore = priorAuthorizationRequestFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'costCategory.name',
      headerName: 'Cost Category',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedure.name',
      headerName: 'Procedure',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationRequestId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'id',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'createdAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.createdAt);
      },
      hide: true
    }, {
      field: 'updatedAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.updatedAt);
      },
      hide: true
    }, {
      field: 'name',
      filter: 'agTextColumnFilter'
    }, {
      field: 'costCategoryId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estimatedCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadPriorAuthorizationProcedureCodesEffect();
    this.store.filterCostCategories('').subscribe();
    this.store.filterProcedures('').subscribe();
    this.store.filterPriorAuthorizationRequests('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
        case 'costCategory':
          {
            const costCategoryCreateActionResultListener = this.costCategoryFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addCostCategory(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                costCategoryCreateActionResultListener.unsubscribe();
              }
            });
            this.costCategoryFeatureStore.createCostCategoryEffect({
              name: newName
            });
            break;
          }
        case 'procedure':
          {
            const procedureCreateActionResultListener = this.procedureFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addProcedure(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                procedureCreateActionResultListener.unsubscribe();
              }
            });
            this.procedureFeatureStore.createProcedureEffect({
              name: newName
            });
            break;
          }
        case 'priorAuthorizationRequest':
          {
            const priorAuthorizationRequestCreateActionResultListener = this.priorAuthorizationRequestFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addPriorAuthorizationRequest(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                priorAuthorizationRequestCreateActionResultListener.unsubscribe();
              }
            });
            this.priorAuthorizationRequestFeatureStore.createPriorAuthorizationRequestEffect({
              name: newName
            });
            break;
          }
        default:
          observer.next(false);
      }
    });
  }
  validateImportData(excelData) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(resolver => {
      this.store.validateImportData(excelData).subscribe(result => {
        resolver.next(result);
        resolver.complete();
      }).unsubscribe();
    });
  }
  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData) {
    this.store.importExcelEffect(excelData);
  }
  searchQueryDidChange(searchQuery) {
    this.store.setSearchQuery(searchQuery);
    this.store.loadPriorAuthorizationProcedureCodesEffect();
  }
}
WebPriorAuthorizationProcedureCodeListComponent.ɵfac = function WebPriorAuthorizationProcedureCodeListComponent_Factory(t) {
  return new (t || WebPriorAuthorizationProcedureCodeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_prior_authorization_procedure_code_shared__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationProcedureCodeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_cost_category_shared__WEBPACK_IMPORTED_MODULE_4__.WebCostCategoryFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_shared__WEBPACK_IMPORTED_MODULE_5__.WebProcedureFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_prior_authorization_request_shared__WEBPACK_IMPORTED_MODULE_6__.WebPriorAuthorizationRequestFeatureStore));
};
WebPriorAuthorizationProcedureCodeListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationProcedureCodeListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebPriorAuthorizationProcedureCodeListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_prior_authorization_procedure_code_ui__WEBPACK_IMPORTED_MODULE_7__.WebPriorAuthorizationProcedureCodeSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_prior_authorization_procedure_code_shared__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationProcedureCodeFeatureStore, _case_clinical_web_cost_category_shared__WEBPACK_IMPORTED_MODULE_4__.WebCostCategoryFeatureStore, _case_clinical_web_procedure_shared__WEBPACK_IMPORTED_MODULE_5__.WebProcedureFeatureStore, _case_clinical_web_prior_authorization_request_shared__WEBPACK_IMPORTED_MODULE_6__.WebPriorAuthorizationRequestFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "priorAuthorizationProcedureCode", "title", "PriorAuthorizationProcedureCode", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebPriorAuthorizationProcedureCodeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebPriorAuthorizationProcedureCodeListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "PriorAuthorizationProcedureCode.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_9__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_10__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 375072:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/feature/src/lib/web-prior-authorization-procedure-code-list/web-prior-authorization-procedure-code-list.module.ts ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationProcedureCodeListModule": () => (/* binding */ WebPriorAuthorizationProcedureCodeListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_prior_authorization_procedure_code_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-prior-authorization-procedure-code-list.component */ 457490);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebPriorAuthorizationProcedureCodeListModule {}
WebPriorAuthorizationProcedureCodeListModule.ɵfac = function WebPriorAuthorizationProcedureCodeListModule_Factory(t) {
  return new (t || WebPriorAuthorizationProcedureCodeListModule)();
};
WebPriorAuthorizationProcedureCodeListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebPriorAuthorizationProcedureCodeListModule
});
WebPriorAuthorizationProcedureCodeListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_prior_authorization_procedure_code_list_component__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationProcedureCodeListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebPriorAuthorizationProcedureCodeListModule, {
    declarations: [_web_prior_authorization_procedure_code_list_component__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationProcedureCodeListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
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