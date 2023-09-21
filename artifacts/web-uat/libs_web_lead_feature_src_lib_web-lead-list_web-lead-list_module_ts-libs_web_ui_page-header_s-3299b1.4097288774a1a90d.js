"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_lead_feature_src_lib_web-lead-list_web-lead-list_module_ts-libs_web_ui_page-header_s-3299b1"],{

/***/ 499641:
/*!********************************************************************************!*\
  !*** ./libs/web/lead/feature/src/lib/web-lead-list/web-lead-list.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadListComponent": () => (/* binding */ WebLeadListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_lead_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/lead/shared */ 208758);
/* harmony import */ var _case_clinical_web_lead_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/lead/ui */ 676518);
/* harmony import */ var _case_clinical_web_accident_type_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/accident-type/shared */ 158055);
/* harmony import */ var _case_clinical_web_lead_status_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/lead-status/shared */ 399207);
/* harmony import */ var _case_clinical_web_lead_source_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/lead-source/shared */ 755632);
/* harmony import */ var _case_clinical_web_user_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/user/shared */ 666012);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);

















function WebLeadListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebLeadListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebLeadListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.leads)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebLeadListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebLeadListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebLeadListComponent {
  constructor(store, accidentTypeFeatureStore, leadStatusFeatureStore, leadSourceFeatureStore, userFeatureStore) {
    this.store = store;
    this.accidentTypeFeatureStore = accidentTypeFeatureStore;
    this.leadStatusFeatureStore = leadStatusFeatureStore;
    this.leadSourceFeatureStore = leadSourceFeatureStore;
    this.userFeatureStore = userFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'accidentType.name',
      headerName: 'Accident Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'driversLicense.name',
      headerName: 'Drivers License',
      filter: 'agTextColumnFilter'
    }, {
      field: 'policeReportAttachment.name',
      headerName: 'Police Report Attachment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'phoneRecording.name',
      headerName: 'Phone Recording',
      filter: 'agTextColumnFilter'
    }, {
      field: 'status.name',
      headerName: 'Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'sourceOfLead.name',
      headerName: 'Source of Lead',
      filter: 'agTextColumnFilter'
    }, {
      field: 'submittedBy.name',
      headerName: 'Submitted by',
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
      field: 'firstName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'middleName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'lastName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'address',
      filter: 'agTextColumnFilter'
    }, {
      field: 'city',
      filter: 'agTextColumnFilter'
    }, {
      field: 'state',
      filter: 'agTextColumnFilter'
    }, {
      field: 'postalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateOfBirth',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dateOfLoss',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dateOfRetention',
      filter: 'agDateColumnFilter'
    }, {
      field: 'phoneNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'emailAddress',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorRepresentation',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accidentTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'driversLicenseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'driversLicenseNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'driversLicenseState',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Severe Injury',
      field: 'severeInjury',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'emergencyContactId',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Allowed to Contact Emergency Contact',
      field: 'allowedToContactEmergencyContact',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Police Report',
      field: 'policeReport',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'policeReportAttachmentId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'phoneRecordingId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'leadStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'leadSpecialistId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'leadSourceId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'submittedById',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'legalCaseId',
      filter: 'agTextColumnFilter'
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadLeadsEffect();
    this.store.filterAccidentTypes('').subscribe();
    this.store.filterDocuments('').subscribe();
    this.store.filterLeadStatuses('').subscribe();
    this.store.filterLeadSources('').subscribe();
    this.store.filterUsers('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
        case 'accidentType':
          {
            const accidentTypeCreateActionResultListener = this.accidentTypeFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAccidentType(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                accidentTypeCreateActionResultListener.unsubscribe();
              }
            });
            this.accidentTypeFeatureStore.createAccidentTypeEffect({
              name: newName
            });
            break;
          }
        case 'leadStatus':
          {
            const leadStatusCreateActionResultListener = this.leadStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addLeadStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                leadStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.leadStatusFeatureStore.createLeadStatusEffect({
              name: newName
            });
            break;
          }
        case 'leadSource':
          {
            const leadSourceCreateActionResultListener = this.leadSourceFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addLeadSource(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                leadSourceCreateActionResultListener.unsubscribe();
              }
            });
            this.leadSourceFeatureStore.createLeadSourceEffect({
              name: newName
            });
            break;
          }
        case 'user':
          {
            const userCreateActionResultListener = this.userFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addUser(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                userCreateActionResultListener.unsubscribe();
              }
            });
            this.userFeatureStore.createUserEffect({
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
    this.store.loadLeadsEffect();
  }
}
WebLeadListComponent.ɵfac = function WebLeadListComponent_Factory(t) {
  return new (t || WebLeadListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_lead_shared__WEBPACK_IMPORTED_MODULE_3__.WebLeadFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_accident_type_shared__WEBPACK_IMPORTED_MODULE_4__.WebAccidentTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_lead_status_shared__WEBPACK_IMPORTED_MODULE_5__.WebLeadStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_lead_source_shared__WEBPACK_IMPORTED_MODULE_6__.WebLeadSourceFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_user_shared__WEBPACK_IMPORTED_MODULE_7__.WebUserFeatureStore));
};
WebLeadListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLeadListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebLeadListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_lead_ui__WEBPACK_IMPORTED_MODULE_8__.WebLeadSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_lead_shared__WEBPACK_IMPORTED_MODULE_3__.WebLeadFeatureStore, _case_clinical_web_accident_type_shared__WEBPACK_IMPORTED_MODULE_4__.WebAccidentTypeFeatureStore, _case_clinical_web_lead_status_shared__WEBPACK_IMPORTED_MODULE_5__.WebLeadStatusFeatureStore, _case_clinical_web_lead_source_shared__WEBPACK_IMPORTED_MODULE_6__.WebLeadSourceFeatureStore, _case_clinical_web_user_shared__WEBPACK_IMPORTED_MODULE_7__.WebUserFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "lead", "title", "Lead", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebLeadListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebLeadListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "Lead.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_10__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_11__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 112611:
/*!*****************************************************************************!*\
  !*** ./libs/web/lead/feature/src/lib/web-lead-list/web-lead-list.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadListModule": () => (/* binding */ WebLeadListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_lead_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-lead-list.component */ 499641);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebLeadListModule {}
WebLeadListModule.ɵfac = function WebLeadListModule_Factory(t) {
  return new (t || WebLeadListModule)();
};
WebLeadListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebLeadListModule
});
WebLeadListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_lead_list_component__WEBPACK_IMPORTED_MODULE_3__.WebLeadListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebLeadListModule, {
    declarations: [_web_lead_list_component__WEBPACK_IMPORTED_MODULE_3__.WebLeadListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
  });
})();

/***/ }),

/***/ 676518:
/*!***************************************************************************************!*\
  !*** ./libs/web/lead/ui/web-lead-select-form/web-lead-select-table-view.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadSelectTableViewComponent": () => (/* binding */ WebLeadSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebLeadSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.leads = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'accidentType.name',
      headerName: 'Accident Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'driversLicense.name',
      headerName: 'Drivers License',
      filter: 'agTextColumnFilter'
    }, {
      field: 'policeReportAttachment.name',
      headerName: 'Police Report Attachment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'phoneRecording.name',
      headerName: 'Phone Recording',
      filter: 'agTextColumnFilter'
    }, {
      field: 'status.name',
      headerName: 'Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'sourceOfLead.name',
      headerName: 'Source of Lead',
      filter: 'agTextColumnFilter'
    }, {
      field: 'submittedBy.name',
      headerName: 'Submitted by',
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
      field: 'firstName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'middleName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'lastName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'address',
      filter: 'agTextColumnFilter'
    }, {
      field: 'city',
      filter: 'agTextColumnFilter'
    }, {
      field: 'state',
      filter: 'agTextColumnFilter'
    }, {
      field: 'postalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateOfBirth',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dateOfLoss',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dateOfRetention',
      filter: 'agDateColumnFilter'
    }, {
      field: 'phoneNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'emailAddress',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorRepresentation',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accidentTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'driversLicenseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'driversLicenseNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'driversLicenseState',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Severe Injury',
      field: 'severeInjury',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'emergencyContactId',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Allowed to Contact Emergency Contact',
      field: 'allowedToContactEmergencyContact',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Police Report',
      field: 'policeReport',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'policeReportAttachmentId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'phoneRecordingId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'leadStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'leadSpecialistId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'leadSourceId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'submittedById',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'legalCaseId',
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
WebLeadSelectTableViewComponent.ɵfac = function WebLeadSelectTableViewComponent_Factory(t) {
  return new (t || WebLeadSelectTableViewComponent)();
};
WebLeadSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLeadSelectTableViewComponent,
  selectors: [["ui-lead-select-table-view"]],
  viewQuery: function WebLeadSelectTableViewComponent_Query(rf, ctx) {
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
    leads: "leads"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "data", "showSidebar", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebLeadSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebLeadSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebLeadSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("data", ctx.leads)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
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