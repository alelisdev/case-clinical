"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_appointment_feature_src_lib_web-appointment-list_web-appointment-list_module_ts"],{

/***/ 308407:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/appointment/feature/src/lib/web-appointment-list/web-appointment-list.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAppointmentListComponent": () => (/* binding */ WebAppointmentListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/appointment/shared */ 31392);
/* harmony import */ var _case_clinical_web_appointment_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/appointment/ui */ 233898);
/* harmony import */ var _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/location/shared */ 774121);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);
/* harmony import */ var _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/clinical-provider/shared */ 19494);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_appointment_status_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/appointment-status/shared */ 945238);
/* harmony import */ var _case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/visit-kind/shared */ 423818);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);























function WebAppointmentListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebAppointmentListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebAppointmentListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r4.appointments)("columnDefs", ctx_r3.columnDefs)("validateFunc", ctx_r3.validateImportData)("createNewFunc", ctx_r3.createNewFunc)("cardViewTemplate", _r1);
  }
}
function WebAppointmentListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebAppointmentListComponent_ng_container_0_ng_container_1_Template, 2, 5, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
function WebAppointmentListComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-json-form", 4);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "appointment_kanban_list")("showSubmitButton", false)("model", ctx_r2.model)("showFormSelector", true)("componentStore", ctx_r2.cardAppointmentStore)("formData", ctx_r2.formData);
  }
}
class WebAppointmentListComponent {
  constructor(store, locationFeatureStore, patientFeatureStore, clinicalProviderFeatureStore, legalCaseFeatureStore, appointmentStatusFeatureStore, visitKindFeatureStore, cardAppointmentStore) {
    this.store = store;
    this.locationFeatureStore = locationFeatureStore;
    this.patientFeatureStore = patientFeatureStore;
    this.clinicalProviderFeatureStore = clinicalProviderFeatureStore;
    this.legalCaseFeatureStore = legalCaseFeatureStore;
    this.appointmentStatusFeatureStore = appointmentStatusFeatureStore;
    this.visitKindFeatureStore = visitKindFeatureStore;
    this.cardAppointmentStore = cardAppointmentStore;
    this.formData = {
      appointments: this.store.formattedAppointments$,
      medicalRecordStatuses: this.store.medicalRecordStatuses$,
      cardAppointments: this.cardAppointmentStore.formattedAppointments$
    };
    this.model = {
      medicalRecordStatusId: ['clljxq1ah0004v06ond80lu5z']
    };
    this.vm$ = this.store.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(vm => console.log(vm.appointments)));
    this.columnDefs = [{
      field: 'location.name',
      headerName: 'Location',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'appointmentStatus.name',
      headerName: 'Appointment Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medicalRecordStatus.name',
      headerName: 'Medical Record Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'visitKind.name',
      headerName: 'Visit Kind',
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
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.createdAt);
      },
      hide: true
    }, {
      field: 'updatedAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.updatedAt);
      },
      hide: true
    }, {
      field: 'name',
      filter: 'agTextColumnFilter'
    }, {
      field: 'appointmentDateAndTime',
      filter: 'agDateColumnFilter'
    }, {
      field: 'locationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Checked in',
      field: 'checkedIn',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'checkedInDateTime',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'MedicalReport',
      field: 'medicalReport.name',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Bill',
      field: 'bill.name',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Imaging',
      field: 'imaging.name',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Duration',
      field: 'duration',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'appointmentStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'visitKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'notes',
      filter: 'agTextColumnFilter'
    }, {
      field: 'recurringEventId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Is First Instance',
      field: 'isFirstInstance',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'description',
      filter: 'agTextColumnFilter'
    }, {
      field: 'start',
      filter: 'agTextColumnFilter'
    }, {
      field: 'end',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'All Day',
      field: 'allDay',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'recurrence',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Final Visit Approved',
      field: 'finalVisitApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadAppointmentsEffect();
    this.store.filterLocations('').subscribe();
    this.store.filterPatients('').subscribe();
    this.store.filterClinicalProviders('').subscribe();
    this.store.filterLegalCases('').subscribe();
    this.store.filterAppointmentStatuses('').subscribe();
    this.store.filterVisitKinds('').subscribe();
    this.cardAppointmentStore.setMedicalRecordStatusOptions(['clljxq1ah0004v06ond80lu5z']);
    this.cardAppointmentStore.loadAppointmentsEffect();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(observer => {
      switch (type) {
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
        case 'appointmentStatus':
          {
            const appointmentStatusCreateActionResultListener = this.appointmentStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAppointmentStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                appointmentStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.appointmentStatusFeatureStore.createAppointmentStatusEffect({
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
        default:
          observer.next(false);
      }
    });
  }
  validateImportData(excelData) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(resolver => {
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
    this.store.loadAppointmentsEffect();
  }
}
WebAppointmentListComponent.ɵfac = function WebAppointmentListComponent_Factory(t) {
  return new (t || WebAppointmentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_4__.WebAppointmentFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__.WebLocationFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_6__.WebPatientFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_7__.WebClinicalProviderFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_8__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_appointment_status_shared__WEBPACK_IMPORTED_MODULE_9__.WebAppointmentStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_10__.WebVisitKindFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]('cardAppointmentStore'));
};
WebAppointmentListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebAppointmentListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebAppointmentListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_appointment_ui__WEBPACK_IMPORTED_MODULE_11__.WebAppointmentSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_4__.WebAppointmentFeatureStore, _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__.WebLocationFeatureStore, _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_6__.WebPatientFeatureStore, _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_7__.WebClinicalProviderFeatureStore, _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_8__.WebLegalCaseFeatureStore, _case_clinical_web_appointment_status_shared__WEBPACK_IMPORTED_MODULE_9__.WebAppointmentStatusFeatureStore, _case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_10__.WebVisitKindFeatureStore, {
    provide: 'cardAppointmentStore',
    useClass: _case_clinical_web_appointment_shared__WEBPACK_IMPORTED_MODULE_4__.WebAppointmentFeatureStore
  }])],
  decls: 3,
  vars: 1,
  consts: [[4, "featureFlag"], ["cardViewTemplate", ""], [4, "ngIf"], ["tableName", "appointment", "title", "Appointment", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "cardViewTemplate", "searchQueryDidChange", "excelDataHasBeenPopulated"], [1, "w-full", "h-full", 3, "formName", "showSubmitButton", "model", "showFormSelector", "componentStore", "formData"]],
  template: function WebAppointmentListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebAppointmentListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebAppointmentListComponent_ng_template_1_Template, 1, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "Appointment.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_13__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_14__.WebDataListComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_15__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 164125:
/*!**************************************************************************************************!*\
  !*** ./libs/web/appointment/feature/src/lib/web-appointment-list/web-appointment-list.module.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAppointmentListModule": () => (/* binding */ WebAppointmentListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_appointment_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-appointment-list.component */ 308407);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);










class WebAppointmentListModule {}
WebAppointmentListModule.ɵfac = function WebAppointmentListModule_Factory(t) {
  return new (t || WebAppointmentListModule)();
};
WebAppointmentListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebAppointmentListModule
});
WebAppointmentListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_appointment_list_component__WEBPACK_IMPORTED_MODULE_3__.WebAppointmentListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.WebUiFormModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebAppointmentListModule, {
    declarations: [_web_appointment_list_component__WEBPACK_IMPORTED_MODULE_3__.WebAppointmentListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.WebUiFormModule]
  });
})();

/***/ })

}]);