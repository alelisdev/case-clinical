"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_case-procedure_feature_src_lib_web-case-procedure-list_web-case-procedure-list_modul-0935c2"],{

/***/ 738123:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/case-procedure/feature/src/lib/web-case-procedure-list/web-case-procedure-list.component.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseProcedureListComponent": () => (/* binding */ WebCaseProcedureListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/case-procedure/shared */ 87804);
/* harmony import */ var _case_clinical_web_case_procedure_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/case-procedure/ui */ 836878);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/appointment/shared */ 31392);
/* harmony import */ var _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/location/shared */ 774121);
/* harmony import */ var _ag_grid_community_client_side_row_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ag-grid-community/client-side-row-model */ 131889);
/* harmony import */ var _ag_grid_enterprise_all_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ag-grid-enterprise/all-modules */ 399193);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);


















function WebCaseProcedureListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ui-data-list", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("searchQueryDidChange", function WebCaseProcedureListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r5.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebCaseProcedureListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.excelDataHasBeenPopulated($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r4 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", vm_r4.caseProcedures)("columnDefs", ctx_r3.columnDefs)("validateFunc", ctx_r3.validateImportData)("createNewFunc", ctx_r3.createNewFunc)("cardViewTemplate", _r1);
  }
}
function WebCaseProcedureListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, WebCaseProcedureListComponent_ng_container_0_ng_container_1_Template, 2, 5, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
const _c0 = function () {
  return {};
};
function WebCaseProcedureListComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ui-formly-json-form", 4);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formName", "caseProcedure_kanban_list")("showSubmitButton", false)("model", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](5, _c0))("componentStore", ctx_r2.store)("formData", ctx_r2.formData);
  }
}
class WebCaseProcedureListComponent {
  constructor(store, legalCaseFeatureStore, appointmentFeatureStore, locationFeatureStore) {
    this.store = store;
    this.legalCaseFeatureStore = legalCaseFeatureStore;
    this.appointmentFeatureStore = appointmentFeatureStore;
    this.locationFeatureStore = locationFeatureStore;
    this.modules = [_ag_grid_community_client_side_row_model__WEBPACK_IMPORTED_MODULE_0__.ClientSideRowModelModule, _ag_grid_enterprise_all_modules__WEBPACK_IMPORTED_MODULE_1__.MasterDetailModule, _ag_grid_enterprise_all_modules__WEBPACK_IMPORTED_MODULE_1__.RowGroupingModule];
    this.vm$ = this.store.vm$;
    this.rowGroupPanelShow = 'always';
    this.formData = {
      caseProcedures: this.store.caseProcedures$
    };
    this.procedureVendorRendererParams = {
      // level 2 procedure vendors
      detailGridOptions: {
        columnDefs: [{
          field: 'name',
          cellRenderer: 'agGroupCellRenderer'
        }, {
          field: 'contract.name'
        }, {
          field: 'vendor.name'
        }, {
          field: 'estimate'
        }, {
          field: 'fundingApproved',
          cellRenderer: 'agCheckboxCellRenderer'
        }],
        defaultColDef: {
          flex: 1
        },
        masterDetail: true,
        detailRowAutoHeight: true,
        detailCellRendererParams: {
          // level 3 case accounts
          detailGridOptions: {
            columnDefs: [{
              field: 'name',
              cellRenderer: 'agGroupCellRenderer'
            }, {
              field: 'count'
            }, {
              field: 'description'
            }, {
              field: 'medicareRate'
            }, {
              field: 'providerPercentOfMedicare'
            }, {
              field: 'contractedAmount'
            }, {
              field: 'markupPercent'
            }, {
              field: 'reimbursedTotal'
            }, {
              field: 'initialRevenue'
            }, {
              field: 'factor'
            }, {
              field: 'retailBill'
            }, {
              field: 'estMargin'
            }, {
              field: 'roi'
            }, {
              field: 'attorneyPaid'
            }, {
              field: 'percentOfRetail'
            }],
            defaultColDef: {
              flex: 1
            },
            masterDetail: true,
            detailRowAutoHeight: true,
            detailCellRendererParams: {
              // level 4 journal entries
              detailGridOptions: {
                columnDefs: [{
                  field: 'name',
                  cellRenderer: 'agGroupCellRenderer'
                }, {
                  field: 'amount'
                }, {
                  field: 'locationName'
                }, {
                  field: 'fromTo'
                }, {
                  field: 'process'
                }, {
                  field: 'perAccountOrAggregateJE'
                }, {
                  field: 'costRate'
                }, {
                  field: 'accountType'
                }, {
                  field: 'accountNumber'
                }, {
                  field: 'postingDate'
                }, {
                  field: 'documentDate'
                }, {
                  field: 'dueDate'
                }],
                defaultColDef: {
                  flex: 1
                }
              },
              getDetailRowData: params => {
                params.successCallback(params.data.journalEntries);
              }
            }
          },
          getDetailRowData: params => {
            params.successCallback(params.data.caseAccounts);
          }
        }
      },
      getDetailRowData: params => {
        params.successCallback(params.data.procedureVendors);
      }
    };
    this.columnDefs = [{
      masterDetail: true,
      detailRowAutoHeight: true,
      detailRendererParams: this.procedureVendorRendererParams,
      headerName: 'Procedure',
      children: [{
        field: 'procedureType.name',
        headerName: 'Procedure Type',
        filter: 'agSetColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agGroupCellRenderer'
      }, {
        field: 'procedureStatus.name',
        headerName: 'Procedure Status',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'location.name',
        headerName: 'Location',
        filter: 'agTextColumnFilter',
        enableRowGroup: true
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
          return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.createdAt);
        },
        hide: true
      }, {
        field: 'updatedAt',
        filter: 'agDateColumnFilter',
        cellClass: 'dateTime',
        valueFormatter: params => {
          var _a;
          return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.updatedAt);
        },
        hide: true
      }, {
        field: 'name',
        filter: 'agTextColumnFilter'
      }, {
        field: 'legalCaseId',
        filter: 'agTextColumnFilter',
        hide: true
      }, {
        field: 'appointmentId',
        filter: 'agTextColumnFilter',
        hide: true
      }, {
        field: 'locationId',
        filter: 'agTextColumnFilter',
        hide: true
      }, {
        field: 'procedureDate',
        filter: 'agDateColumnFilter'
      }, {
        headerName: 'Cost',
        field: 'cost',
        valueFormatter: params => {
          var _a;
          return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.cost, '$', 2);
        },
        filter: 'agNumberColumnFilter',
        aggFunc: 'sum'
      }, {
        field: 'notes',
        filter: 'agTextColumnFilter'
      }, {
        field: 'createdBy',
        filter: 'agTextColumnFilter'
      }, {
        field: 'dateCreated',
        filter: 'agDateColumnFilter'
      }, {
        headerName: 'Removed',
        field: 'removed',
        filter: 'agSetColumnFilter',
        cellRenderer: 'checkboxRenderer'
      }, {
        field: 'approvedDate',
        filter: 'agDateColumnFilter'
      }, {
        field: 'procedureReasonName',
        filter: 'agTextColumnFilter'
      }, {
        field: 'decisionDate',
        filter: 'agDateColumnFilter'
      }, {
        field: 'nextActionDate',
        filter: 'agDateColumnFilter'
      }]
    }, {
      headerName: 'Legal Case',
      children: [{
        field: 'legalCase.accidentType.name',
        headerName: 'Accident Type',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'legalCase.patient.name',
        headerName: 'Patient',
        filter: 'agTextColumnFilter',
        enableRowGroup: true
      }, {
        field: 'legalCase.medLevel.name',
        headerName: 'Med Level',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'legalCase.firm.name',
        headerName: 'Firm',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'legalCase.attorney.name',
        headerName: 'Attorney',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'legalCase.agent.name',
        headerName: 'Assigned To',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }]
    }, {
      headerName: 'Appointment',
      children: [{
        field: 'appointment.appointmentStatus.name',
        headerName: 'Appointment Status',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'appointment.medicalRecordStatus.name',
        headerName: 'Medical Record Status',
        filter: 'agSetColumnFilter',
        enableRowGroup: true
      }, {
        field: 'appointment.appointmentDateAndTime',
        filter: 'agDateColumnFilter',
        enableRowGroup: true
      }, {
        field: 'appointment.patient.name',
        headerName: 'Patient',
        filter: 'agTextColumnFilter',
        enableRowGroup: true
      }, {
        headerName: 'MedicalReport',
        field: 'appointment.medicalReport.name',
        filter: 'agTextColumnFilter',
        enableRowGroup: true
      }, {
        headerName: 'Bill',
        field: 'appointment.bill.name',
        filter: 'agTextColumnFilter',
        enableRowGroup: true
      }, {
        headerName: 'Imaging',
        field: 'appointment.imaging.name',
        filter: 'agTextColumnFilter',
        enableRowGroup: true
      }]
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadCaseProceduresEffect();
    this.store.filterLegalCases('').subscribe();
    this.store.filterAppointments('').subscribe();
    this.store.filterLocations('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(observer => {
      switch (type) {
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
        case 'appointment':
          {
            const appointmentCreateActionResultListener = this.appointmentFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAppointment(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                appointmentCreateActionResultListener.unsubscribe();
              }
            });
            this.appointmentFeatureStore.createAppointmentEffect({
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
    return new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(resolver => {
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
    this.store.loadCaseProceduresEffect();
  }
  onFirstDataRendered(params) {
    console.log('clicked', params);
  }
  onGridReady(params) {
    this.store.caseProcedures$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.tap)(data => {
      params.api.setRowData(data);
    })).subscribe();
  }
  onRowClicked(event) {
    console.log('clicked', event);
    const node = event.api.getDisplayedRowAtIndex(event.rowIndex);
    node.setExpanded(!node.expanded);
  }
  onSelectionChanged(event) {
    const selectedRows = event.api.getSelectedRows();
    this.store.setSelectedCaseProcedures(selectedRows);
  }
}
WebCaseProcedureListComponent.ɵfac = function WebCaseProcedureListComponent_Factory(t) {
  return new (t || WebCaseProcedureListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_6__.WebCaseProcedureFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_8__.WebAppointmentFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_9__.WebLocationFeatureStore));
};
WebCaseProcedureListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: WebCaseProcedureListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebCaseProcedureListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_case_clinical_web_case_procedure_ui__WEBPACK_IMPORTED_MODULE_10__.WebCaseProcedureSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([_case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_6__.WebCaseProcedureFeatureStore, _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__.WebLegalCaseFeatureStore, _case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_8__.WebAppointmentFeatureStore, _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_9__.WebLocationFeatureStore])],
  decls: 3,
  vars: 1,
  consts: [[4, "featureFlag"], ["cardViewTemplate", ""], [4, "ngIf"], ["tableName", "caseProcedure", "title", "CaseProcedure", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "cardViewTemplate", "searchQueryDidChange", "excelDataHasBeenPopulated"], [1, "w-full", "h-full", 3, "formName", "showSubmitButton", "model", "componentStore", "formData"]],
  template: function WebCaseProcedureListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, WebCaseProcedureListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, WebCaseProcedureListComponent_ng_template_1_Template, 1, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("featureFlag", "CaseProcedure.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_12__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_13__.WebDataListComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_14__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 908423:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/case-procedure/feature/src/lib/web-case-procedure-list/web-case-procedure-list.module.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseProcedureListModule": () => (/* binding */ WebCaseProcedureListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ag-grid-community/angular */ 99377);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_case_procedure_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-case-procedure-list.component */ 738123);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);












class WebCaseProcedureListModule {}
WebCaseProcedureListModule.ɵfac = function WebCaseProcedureListModule_Factory(t) {
  return new (t || WebCaseProcedureListModule)();
};
WebCaseProcedureListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebCaseProcedureListModule
});
WebCaseProcedureListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_2__.AgGridModule.withComponents([]), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild([{
    path: '',
    component: _web_case_procedure_list_component__WEBPACK_IMPORTED_MODULE_4__.WebCaseProcedureListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_5__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_6__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_7__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_8__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.WebUiFormModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebCaseProcedureListModule, {
    declarations: [_web_case_procedure_list_component__WEBPACK_IMPORTED_MODULE_4__.WebCaseProcedureListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_2__.AgGridModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_5__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_6__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_7__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_8__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.WebUiFormModule]
  });
})();

/***/ }),

/***/ 836878:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/case-procedure/ui/web-case-procedure-select-form/web-case-procedure-select-table-view.component.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseProcedureSelectTableViewComponent": () => (/* binding */ WebCaseProcedureSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebCaseProcedureSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.caseProcedures = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'appointment.name',
      headerName: 'Appointment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureStatus.name',
      headerName: 'Procedure Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureType.name',
      headerName: 'Procedure Type',
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
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'appointmentId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'locationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'procedureDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Cost',
      field: 'cost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.cost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'notes',
      filter: 'agTextColumnFilter'
    }, {
      field: 'createdBy',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateCreated',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Removed',
      field: 'removed',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'approvedDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'procedureReasonName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'decisionDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'nextActionDate',
      filter: 'agDateColumnFilter'
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
WebCaseProcedureSelectTableViewComponent.ɵfac = function WebCaseProcedureSelectTableViewComponent_Factory(t) {
  return new (t || WebCaseProcedureSelectTableViewComponent)();
};
WebCaseProcedureSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCaseProcedureSelectTableViewComponent,
  selectors: [["ui-case-procedure-select-table-view"]],
  viewQuery: function WebCaseProcedureSelectTableViewComponent_Query(rf, ctx) {
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
    caseProcedures: "caseProcedures"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebCaseProcedureSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebCaseProcedureSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebCaseProcedureSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.caseProcedures)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
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