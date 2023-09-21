"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_clinical-provider-location_feature_src_lib_web-clinical-provider-location-list_web-c-08d1c1"],{

/***/ 666718:
/*!**************************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/feature/src/lib/web-clinical-provider-location-list/web-clinical-provider-location-list.component.ts ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderLocationListComponent": () => (/* binding */ WebClinicalProviderLocationListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_clinical_provider_location_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/clinical-provider-location/shared */ 988473);
/* harmony import */ var _case_clinical_web_clinical_provider_location_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/clinical-provider-location/ui */ 148414);
/* harmony import */ var _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/clinical-provider/shared */ 19494);
/* harmony import */ var _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/location/shared */ 774121);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);













function WebClinicalProviderLocationListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebClinicalProviderLocationListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebClinicalProviderLocationListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.clinicalProviderLocations)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebClinicalProviderLocationListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebClinicalProviderLocationListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebClinicalProviderLocationListComponent {
  constructor(store, clinicalProviderFeatureStore, locationFeatureStore) {
    this.store = store;
    this.clinicalProviderFeatureStore = clinicalProviderFeatureStore;
    this.locationFeatureStore = locationFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'location.name',
      headerName: 'Location',
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
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'locationId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadClinicalProviderLocationsEffect();
    this.store.filterClinicalProviders('').subscribe();
    this.store.filterLocations('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
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
        case 'location':
          {
            const locationCreateActionResultListener = this.locationFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addLocation(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                locationCreateActionResultListener.unsubscribe();
              }
            });
            this.locationFeatureStore.createLocationEffect({
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
    this.store.loadClinicalProviderLocationsEffect();
  }
}
WebClinicalProviderLocationListComponent.ɵfac = function WebClinicalProviderLocationListComponent_Factory(t) {
  return new (t || WebClinicalProviderLocationListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_location_shared__WEBPACK_IMPORTED_MODULE_3__.WebClinicalProviderLocationFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_4__.WebClinicalProviderFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__.WebLocationFeatureStore));
};
WebClinicalProviderLocationListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClinicalProviderLocationListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebClinicalProviderLocationListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_clinical_provider_location_ui__WEBPACK_IMPORTED_MODULE_6__.WebClinicalProviderLocationSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_clinical_provider_location_shared__WEBPACK_IMPORTED_MODULE_3__.WebClinicalProviderLocationFeatureStore, _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_4__.WebClinicalProviderFeatureStore, _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__.WebLocationFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "clinicalProviderLocation", "title", "ClinicalProviderLocation", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebClinicalProviderLocationListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebClinicalProviderLocationListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "ClinicalProviderLocation.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_8__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_9__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 117427:
/*!***********************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/feature/src/lib/web-clinical-provider-location-list/web-clinical-provider-location-list.module.ts ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderLocationListModule": () => (/* binding */ WebClinicalProviderLocationListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_clinical_provider_location_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-clinical-provider-location-list.component */ 666718);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebClinicalProviderLocationListModule {}
WebClinicalProviderLocationListModule.ɵfac = function WebClinicalProviderLocationListModule_Factory(t) {
  return new (t || WebClinicalProviderLocationListModule)();
};
WebClinicalProviderLocationListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebClinicalProviderLocationListModule
});
WebClinicalProviderLocationListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_clinical_provider_location_list_component__WEBPACK_IMPORTED_MODULE_3__.WebClinicalProviderLocationListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebClinicalProviderLocationListModule, {
    declarations: [_web_clinical_provider_location_list_component__WEBPACK_IMPORTED_MODULE_3__.WebClinicalProviderLocationListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
  });
})();

/***/ }),

/***/ 148414:
/*!*********************************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/ui/web-clinical-provider-location-select-form/web-clinical-provider-location-select-table-view.component.ts ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderLocationSelectTableViewComponent": () => (/* binding */ WebClinicalProviderLocationSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebClinicalProviderLocationSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.clinicalProviderLocations = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'location.name',
      headerName: 'Location',
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
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'locationId',
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
WebClinicalProviderLocationSelectTableViewComponent.ɵfac = function WebClinicalProviderLocationSelectTableViewComponent_Factory(t) {
  return new (t || WebClinicalProviderLocationSelectTableViewComponent)();
};
WebClinicalProviderLocationSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClinicalProviderLocationSelectTableViewComponent,
  selectors: [["ui-clinical-provider-location-select-table-view"]],
  viewQuery: function WebClinicalProviderLocationSelectTableViewComponent_Query(rf, ctx) {
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
    clinicalProviderLocations: "clinicalProviderLocations"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebClinicalProviderLocationSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebClinicalProviderLocationSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebClinicalProviderLocationSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.clinicalProviderLocations)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);