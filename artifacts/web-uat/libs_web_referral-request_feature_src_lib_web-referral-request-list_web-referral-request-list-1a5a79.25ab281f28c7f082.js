"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_referral-request_feature_src_lib_web-referral-request-list_web-referral-request-list-1a5a79"],{

/***/ 820033:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/referral-request/feature/src/lib/web-referral-request-list/web-referral-request-list.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebReferralRequestListComponent": () => (/* binding */ WebReferralRequestListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_referral_request_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/referral-request/shared */ 45162);
/* harmony import */ var _case_clinical_web_referral_request_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/referral-request/ui */ 376037);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/clinical-provider/shared */ 19494);
/* harmony import */ var _case_clinical_web_clinical_provider_location_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/clinical-provider-location/shared */ 988473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);

















function WebReferralRequestListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebReferralRequestListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebReferralRequestListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.referralRequests)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebReferralRequestListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebReferralRequestListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebReferralRequestListComponent {
  constructor(store, patientFeatureStore, legalCaseFeatureStore, clinicalProviderFeatureStore, clinicalProviderLocationFeatureStore) {
    this.store = store;
    this.patientFeatureStore = patientFeatureStore;
    this.legalCaseFeatureStore = legalCaseFeatureStore;
    this.clinicalProviderFeatureStore = clinicalProviderFeatureStore;
    this.clinicalProviderLocationFeatureStore = clinicalProviderLocationFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'requestingProvider.name',
      headerName: 'Requesting Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referredTo.name',
      headerName: 'Referred to',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referredToLocation.name',
      headerName: 'Referred to Location',
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
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'requestingProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'referredToId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProviderLocationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'status',
      filter: 'agTextColumnFilter'
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadReferralRequestsEffect();
    this.store.filterPatients('').subscribe();
    this.store.filterLegalCases('').subscribe();
    this.store.filterClinicalProviders('').subscribe();
    this.store.filterClinicalProviderLocations('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
        case 'patient':
          {
            const patientCreateActionResultListener = this.patientFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addPatient(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                patientCreateActionResultListener.unsubscribe();
              }
            });
            this.patientFeatureStore.createPatientEffect({
              name: newName
            });
            break;
          }
        case 'legalCase':
          {
            const legalCaseCreateActionResultListener = this.legalCaseFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addLegalCase(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                legalCaseCreateActionResultListener.unsubscribe();
              }
            });
            this.legalCaseFeatureStore.createLegalCaseEffect({
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
        case 'clinicalProviderLocation':
          {
            const clinicalProviderLocationCreateActionResultListener = this.clinicalProviderLocationFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addClinicalProviderLocation(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                clinicalProviderLocationCreateActionResultListener.unsubscribe();
              }
            });
            this.clinicalProviderLocationFeatureStore.createClinicalProviderLocationEffect({
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
    this.store.loadReferralRequestsEffect();
  }
}
WebReferralRequestListComponent.ɵfac = function WebReferralRequestListComponent_Factory(t) {
  return new (t || WebReferralRequestListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_referral_request_shared__WEBPACK_IMPORTED_MODULE_3__.WebReferralRequestFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_4__.WebPatientFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_5__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_6__.WebClinicalProviderFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_location_shared__WEBPACK_IMPORTED_MODULE_7__.WebClinicalProviderLocationFeatureStore));
};
WebReferralRequestListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebReferralRequestListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebReferralRequestListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_referral_request_ui__WEBPACK_IMPORTED_MODULE_8__.WebReferralRequestSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_referral_request_shared__WEBPACK_IMPORTED_MODULE_3__.WebReferralRequestFeatureStore, _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_4__.WebPatientFeatureStore, _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_5__.WebLegalCaseFeatureStore, _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_6__.WebClinicalProviderFeatureStore, _case_clinical_web_clinical_provider_location_shared__WEBPACK_IMPORTED_MODULE_7__.WebClinicalProviderLocationFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "referralRequest", "title", "ReferralRequest", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebReferralRequestListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebReferralRequestListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "ReferralRequest.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_10__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_11__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 286607:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/referral-request/feature/src/lib/web-referral-request-list/web-referral-request-list.module.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebReferralRequestListModule": () => (/* binding */ WebReferralRequestListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_referral_request_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-referral-request-list.component */ 820033);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebReferralRequestListModule {}
WebReferralRequestListModule.ɵfac = function WebReferralRequestListModule_Factory(t) {
  return new (t || WebReferralRequestListModule)();
};
WebReferralRequestListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebReferralRequestListModule
});
WebReferralRequestListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_referral_request_list_component__WEBPACK_IMPORTED_MODULE_3__.WebReferralRequestListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebReferralRequestListModule, {
    declarations: [_web_referral_request_list_component__WEBPACK_IMPORTED_MODULE_3__.WebReferralRequestListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
  });
})();

/***/ }),

/***/ 376037:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/referral-request/ui/web-referral-request-select-form/web-referral-request-select-table-view.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebReferralRequestSelectTableViewComponent": () => (/* binding */ WebReferralRequestSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebReferralRequestSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.referralRequests = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'requestingProvider.name',
      headerName: 'Requesting Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referredTo.name',
      headerName: 'Referred to',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referredToLocation.name',
      headerName: 'Referred to Location',
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
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'requestingProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'referredToId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProviderLocationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'status',
      filter: 'agTextColumnFilter'
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
WebReferralRequestSelectTableViewComponent.ɵfac = function WebReferralRequestSelectTableViewComponent_Factory(t) {
  return new (t || WebReferralRequestSelectTableViewComponent)();
};
WebReferralRequestSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebReferralRequestSelectTableViewComponent,
  selectors: [["ui-referral-request-select-table-view"]],
  viewQuery: function WebReferralRequestSelectTableViewComponent_Query(rf, ctx) {
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
    referralRequests: "referralRequests"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 6,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebReferralRequestSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebReferralRequestSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebReferralRequestSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.referralRequests)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);