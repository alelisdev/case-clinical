"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_procedure-vendor_feature_src_lib_web-procedure-vendor-list_web-procedure-vendor-list-48db44"],{

/***/ 850634:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/feature/src/lib/web-procedure-vendor-list/web-procedure-vendor-list.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorListComponent": () => (/* binding */ WebProcedureVendorListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_procedure_vendor_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/procedure-vendor/shared */ 232634);
/* harmony import */ var _case_clinical_web_procedure_vendor_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/procedure-vendor/ui */ 376790);
/* harmony import */ var _case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/case-procedure/shared */ 87804);
/* harmony import */ var _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/contract/shared */ 895333);
/* harmony import */ var _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/vendor/shared */ 92079);
/* harmony import */ var _case_clinical_web_procedure_vendor_status_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/procedure-vendor-status/shared */ 331126);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);


















function WebProcedureVendorListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebProcedureVendorListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebProcedureVendorListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.excelDataHasBeenPopulated($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r4 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r4.procedureVendors)("columnDefs", ctx_r3.columnDefs)("validateFunc", ctx_r3.validateImportData)("createNewFunc", ctx_r3.createNewFunc)("cardViewTemplate", _r1);
  }
}
function WebProcedureVendorListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebProcedureVendorListComponent_ng_container_0_ng_container_1_Template, 2, 5, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
const _c0 = function () {
  return {};
};
function WebProcedureVendorListComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-json-form", 4);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "procedureVendors_kanban_list")("showSubmitButton", false)("model", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c0))("componentStore", ctx_r2.store)("formData", ctx_r2.formData);
  }
}
class WebProcedureVendorListComponent {
  constructor(store, caseProcedureFeatureStore, contractFeatureStore, vendorFeatureStore, procedureVendorStatusFeatureStore) {
    this.store = store;
    this.caseProcedureFeatureStore = caseProcedureFeatureStore;
    this.contractFeatureStore = contractFeatureStore;
    this.vendorFeatureStore = vendorFeatureStore;
    this.procedureVendorStatusFeatureStore = procedureVendorStatusFeatureStore;
    this.vm$ = this.store.vm$;
    this.formData = {
      procedureVendors: this.store.procedureVendors$
    };
    this.columnDefs = [{
      field: 'procedure.name',
      headerName: 'Procedure',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contract.name',
      headerName: 'Contract',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendor.name',
      headerName: 'Vendor',
      filter: 'agTextColumnFilter'
    }, {
      field: 'status.name',
      headerName: 'Status',
      filter: 'agTextColumnFilter'
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
      field: 'procedureId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'vendorId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'statusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Estimate',
      field: 'estimate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estimate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Funding Approved',
      field: 'fundingApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadProcedureVendorsEffect();
    this.store.filterCaseProcedures('').subscribe();
    this.store.filterContracts('').subscribe();
    this.store.filterVendors('').subscribe();
    this.store.filterProcedureVendorStatuses('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
        case 'caseProcedure':
          {
            const caseProcedureCreateActionResultListener = this.caseProcedureFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addCaseProcedure(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                caseProcedureCreateActionResultListener.unsubscribe();
              }
            });
            this.caseProcedureFeatureStore.createCaseProcedureEffect({
              name: newName
            });
            break;
          }
        case 'contract':
          {
            const contractCreateActionResultListener = this.contractFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addContract(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                contractCreateActionResultListener.unsubscribe();
              }
            });
            this.contractFeatureStore.createContractEffect({
              name: newName
            });
            break;
          }
        case 'vendor':
          {
            const vendorCreateActionResultListener = this.vendorFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addVendor(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                vendorCreateActionResultListener.unsubscribe();
              }
            });
            this.vendorFeatureStore.createVendorEffect({
              name: newName
            });
            break;
          }
        case 'procedureVendorStatus':
          {
            const procedureVendorStatusCreateActionResultListener = this.procedureVendorStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addProcedureVendorStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                procedureVendorStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.procedureVendorStatusFeatureStore.createProcedureVendorStatusEffect({
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
    this.store.loadProcedureVendorsEffect();
  }
}
WebProcedureVendorListComponent.ɵfac = function WebProcedureVendorListComponent_Factory(t) {
  return new (t || WebProcedureVendorListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_vendor_shared__WEBPACK_IMPORTED_MODULE_3__.WebProcedureVendorFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_4__.WebCaseProcedureFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_5__.WebContractFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_6__.WebVendorFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_vendor_status_shared__WEBPACK_IMPORTED_MODULE_7__.WebProcedureVendorStatusFeatureStore));
};
WebProcedureVendorListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebProcedureVendorListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebProcedureVendorListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_procedure_vendor_ui__WEBPACK_IMPORTED_MODULE_8__.WebProcedureVendorSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_procedure_vendor_shared__WEBPACK_IMPORTED_MODULE_3__.WebProcedureVendorFeatureStore, _case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_4__.WebCaseProcedureFeatureStore, _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_5__.WebContractFeatureStore, _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_6__.WebVendorFeatureStore, _case_clinical_web_procedure_vendor_status_shared__WEBPACK_IMPORTED_MODULE_7__.WebProcedureVendorStatusFeatureStore])],
  decls: 3,
  vars: 1,
  consts: [[4, "featureFlag"], ["cardViewTemplate", ""], [4, "ngIf"], ["tableName", "procedureVendor", "title", "ProcedureVendor", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "cardViewTemplate", "searchQueryDidChange", "excelDataHasBeenPopulated"], [1, "w-full", "h-full", 3, "formName", "showSubmitButton", "model", "componentStore", "formData"]],
  template: function WebProcedureVendorListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebProcedureVendorListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebProcedureVendorListComponent_ng_template_1_Template, 1, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "ProcedureVendor.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_10__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_11__.WebDataListComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_12__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 422460:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/feature/src/lib/web-procedure-vendor-list/web-procedure-vendor-list.module.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorListModule": () => (/* binding */ WebProcedureVendorListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_procedure_vendor_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-procedure-vendor-list.component */ 850634);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);










class WebProcedureVendorListModule {}
WebProcedureVendorListModule.ɵfac = function WebProcedureVendorListModule_Factory(t) {
  return new (t || WebProcedureVendorListModule)();
};
WebProcedureVendorListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebProcedureVendorListModule
});
WebProcedureVendorListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_procedure_vendor_list_component__WEBPACK_IMPORTED_MODULE_3__.WebProcedureVendorListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.WebUiFormModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebProcedureVendorListModule, {
    declarations: [_web_procedure_vendor_list_component__WEBPACK_IMPORTED_MODULE_3__.WebProcedureVendorListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.WebUiFormModule]
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