"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_contracted-rate_feature_src_lib_web-contracted-rate-list_web-contracted-rate-list_mo-d27e36"],{

/***/ 783570:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/contracted-rate/feature/src/lib/web-contracted-rate-list/web-contracted-rate-list.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractedRateListComponent": () => (/* binding */ WebContractedRateListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_contracted_rate_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/contracted-rate/shared */ 980449);
/* harmony import */ var _case_clinical_web_contracted_rate_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/contracted-rate/ui */ 426107);
/* harmony import */ var _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/contract/shared */ 895333);
/* harmony import */ var _case_clinical_web_contracted_rate_kind_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/contracted-rate-kind/shared */ 778594);
/* harmony import */ var _case_clinical_web_contract_kind_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/contract-kind/shared */ 371422);
/* harmony import */ var _case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/visit-kind/shared */ 423818);
/* harmony import */ var _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/clinical-provider/shared */ 19494);
/* harmony import */ var _case_clinical_web_specialty_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/specialty/shared */ 348481);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);





















function WebContractedRateListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebContractedRateListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebContractedRateListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.contractedRates)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebContractedRateListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebContractedRateListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebContractedRateListComponent {
  constructor(store, contractFeatureStore, contractedRateKindFeatureStore, contractKindFeatureStore, visitKindFeatureStore, clinicalProviderFeatureStore, specialtyFeatureStore) {
    this.store = store;
    this.contractFeatureStore = contractFeatureStore;
    this.contractedRateKindFeatureStore = contractedRateKindFeatureStore;
    this.contractKindFeatureStore = contractKindFeatureStore;
    this.visitKindFeatureStore = visitKindFeatureStore;
    this.clinicalProviderFeatureStore = clinicalProviderFeatureStore;
    this.specialtyFeatureStore = specialtyFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'contract.name',
      headerName: 'Contract',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contractedRateKind.name',
      headerName: 'Contracted Rate Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contractKind.name',
      headerName: 'Contract Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'visitKind.name',
      headerName: 'Visit Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'specialty.name',
      headerName: 'Specialty',
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
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.amount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Percentage',
      field: 'percentage',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.percentage, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Reimbursed Rate',
      field: 'reimbursedRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.reimbursedRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Bill on Behalf',
      field: 'billOnBehalf',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'contractId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractedRateKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'visitKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'specialtyId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadContractedRatesEffect();
    this.store.filterContracts('').subscribe();
    this.store.filterContractedRateKinds('').subscribe();
    this.store.filterContractKinds('').subscribe();
    this.store.filterVisitKinds('').subscribe();
    this.store.filterClinicalProviders('').subscribe();
    this.store.filterSpecialties('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
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
        case 'contractedRateKind':
          {
            const contractedRateKindCreateActionResultListener = this.contractedRateKindFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addContractedRateKind(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                contractedRateKindCreateActionResultListener.unsubscribe();
              }
            });
            this.contractedRateKindFeatureStore.createContractedRateKindEffect({
              name: newName
            });
            break;
          }
        case 'contractKind':
          {
            const contractKindCreateActionResultListener = this.contractKindFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addContractKind(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                contractKindCreateActionResultListener.unsubscribe();
              }
            });
            this.contractKindFeatureStore.createContractKindEffect({
              name: newName
            });
            break;
          }
        case 'visitKind':
          {
            const visitKindCreateActionResultListener = this.visitKindFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addVisitKind(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                visitKindCreateActionResultListener.unsubscribe();
              }
            });
            this.visitKindFeatureStore.createVisitKindEffect({
              name: newName
            });
            break;
          }
        case 'clinicalProvider':
          {
            const clinicalProviderCreateActionResultListener = this.clinicalProviderFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addClinicalProvider(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                clinicalProviderCreateActionResultListener.unsubscribe();
              }
            });
            this.clinicalProviderFeatureStore.createClinicalProviderEffect({
              name: newName
            });
            break;
          }
        case 'specialty':
          {
            const specialtyCreateActionResultListener = this.specialtyFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addSpecialty(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                specialtyCreateActionResultListener.unsubscribe();
              }
            });
            this.specialtyFeatureStore.createSpecialtyEffect({
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
    this.store.loadContractedRatesEffect();
  }
}
WebContractedRateListComponent.ɵfac = function WebContractedRateListComponent_Factory(t) {
  return new (t || WebContractedRateListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contracted_rate_shared__WEBPACK_IMPORTED_MODULE_3__.WebContractedRateFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_4__.WebContractFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contracted_rate_kind_shared__WEBPACK_IMPORTED_MODULE_5__.WebContractedRateKindFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contract_kind_shared__WEBPACK_IMPORTED_MODULE_6__.WebContractKindFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_7__.WebVisitKindFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_8__.WebClinicalProviderFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_specialty_shared__WEBPACK_IMPORTED_MODULE_9__.WebSpecialtyFeatureStore));
};
WebContractedRateListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebContractedRateListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebContractedRateListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_contracted_rate_ui__WEBPACK_IMPORTED_MODULE_10__.WebContractedRateSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_contracted_rate_shared__WEBPACK_IMPORTED_MODULE_3__.WebContractedRateFeatureStore, _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_4__.WebContractFeatureStore, _case_clinical_web_contracted_rate_kind_shared__WEBPACK_IMPORTED_MODULE_5__.WebContractedRateKindFeatureStore, _case_clinical_web_contract_kind_shared__WEBPACK_IMPORTED_MODULE_6__.WebContractKindFeatureStore, _case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_7__.WebVisitKindFeatureStore, _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_8__.WebClinicalProviderFeatureStore, _case_clinical_web_specialty_shared__WEBPACK_IMPORTED_MODULE_9__.WebSpecialtyFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "contractedRate", "title", "ContractedRate", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebContractedRateListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebContractedRateListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "ContractedRate.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_12__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_13__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 14174:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/contracted-rate/feature/src/lib/web-contracted-rate-list/web-contracted-rate-list.module.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractedRateListModule": () => (/* binding */ WebContractedRateListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_contracted_rate_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-contracted-rate-list.component */ 783570);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebContractedRateListModule {}
WebContractedRateListModule.ɵfac = function WebContractedRateListModule_Factory(t) {
  return new (t || WebContractedRateListModule)();
};
WebContractedRateListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebContractedRateListModule
});
WebContractedRateListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_contracted_rate_list_component__WEBPACK_IMPORTED_MODULE_3__.WebContractedRateListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebContractedRateListModule, {
    declarations: [_web_contracted_rate_list_component__WEBPACK_IMPORTED_MODULE_3__.WebContractedRateListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
  });
})();

/***/ })

}]);