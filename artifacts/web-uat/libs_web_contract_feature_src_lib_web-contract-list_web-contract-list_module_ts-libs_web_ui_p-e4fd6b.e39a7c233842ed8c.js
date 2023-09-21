"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_contract_feature_src_lib_web-contract-list_web-contract-list_module_ts-libs_web_ui_p-e4fd6b"],{

/***/ 992737:
/*!********************************************************************************************!*\
  !*** ./libs/web/contract/feature/src/lib/web-contract-list/web-contract-list.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractListComponent": () => (/* binding */ WebContractListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/contract/shared */ 895333);
/* harmony import */ var _case_clinical_web_contract_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/contract/ui */ 334127);
/* harmony import */ var _case_clinical_web_organization_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/organization/shared */ 364020);
/* harmony import */ var _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/vendor/shared */ 92079);
/* harmony import */ var _case_clinical_web_reconciliation_period_type_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/reconciliation-period-type/shared */ 674877);
/* harmony import */ var _case_clinical_web_calculation_basis_type_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/calculation-basis-type/shared */ 417811);
/* harmony import */ var _case_clinical_web_process_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/process/shared */ 460693);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);



















function WebContractListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebContractListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebContractListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.contracts)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebContractListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebContractListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebContractListComponent {
  constructor(store, organizationFeatureStore, vendorFeatureStore, reconciliationPeriodTypeFeatureStore, calculationBasisTypeFeatureStore, processFeatureStore) {
    this.store = store;
    this.organizationFeatureStore = organizationFeatureStore;
    this.vendorFeatureStore = vendorFeatureStore;
    this.reconciliationPeriodTypeFeatureStore = reconciliationPeriodTypeFeatureStore;
    this.calculationBasisTypeFeatureStore = calculationBasisTypeFeatureStore;
    this.processFeatureStore = processFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'organization.name',
      headerName: 'Organization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingOrganization.name',
      headerName: 'Billing Organization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'template.name',
      headerName: 'Template',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendor.name',
      headerName: 'Vendor',
      filter: 'agTextColumnFilter'
    }, {
      field: 'reconciliationPeriodType.name',
      headerName: 'Reconciliation Period Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'calculationBasisType.name',
      headerName: 'Calculation Basis Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'process.name',
      headerName: 'Process',
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
      field: 'organizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'billingOrganizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'templateId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Bill on Behalf',
      field: 'billOnBehalf',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'billRate',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendorId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'maturityDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Requires Tpa Medical Necessity',
      field: 'requiresTpaMedicalNecessity',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Requires Tpa Medicare Allowable',
      field: 'requiresTpaMedicareAllowable',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'reconciliationPeriodTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'calculationBasisTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Signed',
      field: 'signed',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'processId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadContractsEffect();
    this.store.filterOrganizations('').subscribe();
    this.store.filterTemplates('').subscribe();
    this.store.filterVendors('').subscribe();
    this.store.filterReconciliationPeriodTypes('').subscribe();
    this.store.filterCalculationBasisTypes('').subscribe();
    this.store.filterProcesses('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
        case 'organization':
          {
            const organizationCreateActionResultListener = this.organizationFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addOrganization(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                organizationCreateActionResultListener.unsubscribe();
              }
            });
            this.organizationFeatureStore.createOrganizationEffect({
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
        case 'reconciliationPeriodType':
          {
            const reconciliationPeriodTypeCreateActionResultListener = this.reconciliationPeriodTypeFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addReconciliationPeriodType(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                reconciliationPeriodTypeCreateActionResultListener.unsubscribe();
              }
            });
            this.reconciliationPeriodTypeFeatureStore.createReconciliationPeriodTypeEffect({
              name: newName
            });
            break;
          }
        case 'calculationBasisType':
          {
            const calculationBasisTypeCreateActionResultListener = this.calculationBasisTypeFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addCalculationBasisType(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                calculationBasisTypeCreateActionResultListener.unsubscribe();
              }
            });
            this.calculationBasisTypeFeatureStore.createCalculationBasisTypeEffect({
              name: newName
            });
            break;
          }
        case 'process':
          {
            const processCreateActionResultListener = this.processFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addProcess(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                processCreateActionResultListener.unsubscribe();
              }
            });
            this.processFeatureStore.createProcessEffect({
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
    this.store.loadContractsEffect();
  }
}
WebContractListComponent.ɵfac = function WebContractListComponent_Factory(t) {
  return new (t || WebContractListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_3__.WebContractFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_organization_shared__WEBPACK_IMPORTED_MODULE_4__.WebOrganizationFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_5__.WebVendorFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_reconciliation_period_type_shared__WEBPACK_IMPORTED_MODULE_6__.WebReconciliationPeriodTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_calculation_basis_type_shared__WEBPACK_IMPORTED_MODULE_7__.WebCalculationBasisTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_process_shared__WEBPACK_IMPORTED_MODULE_8__.WebProcessFeatureStore));
};
WebContractListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebContractListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebContractListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_contract_ui__WEBPACK_IMPORTED_MODULE_9__.WebContractSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_3__.WebContractFeatureStore, _case_clinical_web_organization_shared__WEBPACK_IMPORTED_MODULE_4__.WebOrganizationFeatureStore, _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_5__.WebVendorFeatureStore, _case_clinical_web_reconciliation_period_type_shared__WEBPACK_IMPORTED_MODULE_6__.WebReconciliationPeriodTypeFeatureStore, _case_clinical_web_calculation_basis_type_shared__WEBPACK_IMPORTED_MODULE_7__.WebCalculationBasisTypeFeatureStore, _case_clinical_web_process_shared__WEBPACK_IMPORTED_MODULE_8__.WebProcessFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "contract", "title", "Contract", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebContractListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebContractListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "Contract.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_11__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_12__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 707286:
/*!*****************************************************************************************!*\
  !*** ./libs/web/contract/feature/src/lib/web-contract-list/web-contract-list.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractListModule": () => (/* binding */ WebContractListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_contract_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-contract-list.component */ 992737);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebContractListModule {}
WebContractListModule.ɵfac = function WebContractListModule_Factory(t) {
  return new (t || WebContractListModule)();
};
WebContractListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebContractListModule
});
WebContractListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_contract_list_component__WEBPACK_IMPORTED_MODULE_3__.WebContractListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebContractListModule, {
    declarations: [_web_contract_list_component__WEBPACK_IMPORTED_MODULE_3__.WebContractListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
  });
})();

/***/ }),

/***/ 334127:
/*!***************************************************************************************************!*\
  !*** ./libs/web/contract/ui/web-contract-select-form/web-contract-select-table-view.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractSelectTableViewComponent": () => (/* binding */ WebContractSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebContractSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.contracts = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'organization.name',
      headerName: 'Organization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingOrganization.name',
      headerName: 'Billing Organization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'template.name',
      headerName: 'Template',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendor.name',
      headerName: 'Vendor',
      filter: 'agTextColumnFilter'
    }, {
      field: 'reconciliationPeriodType.name',
      headerName: 'Reconciliation Period Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'calculationBasisType.name',
      headerName: 'Calculation Basis Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'process.name',
      headerName: 'Process',
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
      field: 'organizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'billingOrganizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'templateId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Bill on Behalf',
      field: 'billOnBehalf',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'billRate',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendorId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'maturityDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Requires Tpa Medical Necessity',
      field: 'requiresTpaMedicalNecessity',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Requires Tpa Medicare Allowable',
      field: 'requiresTpaMedicareAllowable',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'reconciliationPeriodTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'calculationBasisTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Signed',
      field: 'signed',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'processId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
  }
  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows);
  }
  setSelected(ids) {
    this.tableView.gridApi.forEachNode(node => {
      var _a;
      if (ids.includes((_a = node.data) === null || _a === void 0 ? void 0 : _a.id)) {
        node.setSelected(true);
      } else {
        node.setSelected(false);
      }
    });
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected);
  }
}
WebContractSelectTableViewComponent.ɵfac = function WebContractSelectTableViewComponent_Factory(t) {
  return new (t || WebContractSelectTableViewComponent)();
};
WebContractSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebContractSelectTableViewComponent,
  selectors: [["ui-contract-select-table-view"]],
  viewQuery: function WebContractSelectTableViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  inputs: {
    autoHeight: "autoHeight",
    contracts: "contracts"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebContractSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebContractSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebContractSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.contracts)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
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

/***/ })

}]);