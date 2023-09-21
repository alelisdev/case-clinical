"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_legal-case_feature_src_lib_web-legal-case-list_web-legal-case-list_module_ts-libs_we-fab3a0"],{

/***/ 705679:
/*!**************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-list/web-legal-case-list.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseListComponent": () => (/* binding */ WebLegalCaseListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_legal_case_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @case-clinical/web/legal-case/ui */ 336734);
/* harmony import */ var _case_clinical_web_accident_type_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/accident-type/shared */ 158055);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);
/* harmony import */ var _case_clinical_web_med_level_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/med-level/shared */ 976675);
/* harmony import */ var _case_clinical_web_firm_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/firm/shared */ 228366);
/* harmony import */ var _case_clinical_web_attorney_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/attorney/shared */ 645161);
/* harmony import */ var _case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/case-status/shared */ 188497);
/* harmony import */ var _case_clinical_web_case_type_shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/case-type/shared */ 447024);
/* harmony import */ var _case_clinical_web_patient_treatment_status_shared__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/patient-treatment-status/shared */ 997203);
/* harmony import */ var _case_clinical_web_case_progress_status_shared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/case-progress-status/shared */ 314772);
/* harmony import */ var _case_clinical_web_adverse_insurance_status_shared__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/adverse-insurance-status/shared */ 368430);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);





























function WebLegalCaseListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebLegalCaseListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebLegalCaseListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r2.legalCases)("columnDefs", ctx_r1.columnDefs)("validateFunc", ctx_r1.validateImportData)("createNewFunc", ctx_r1.createNewFunc);
  }
}
function WebLegalCaseListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebLegalCaseListComponent_ng_container_0_ng_container_1_Template, 2, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
class WebLegalCaseListComponent {
  constructor(store, accidentTypeFeatureStore, patientFeatureStore, medLevelFeatureStore, firmFeatureStore, attorneyFeatureStore, caseStatusFeatureStore, caseTypeFeatureStore, patientTreatmentStatusFeatureStore, caseProgressStatusFeatureStore, adverseInsuranceStatusFeatureStore) {
    this.store = store;
    this.accidentTypeFeatureStore = accidentTypeFeatureStore;
    this.patientFeatureStore = patientFeatureStore;
    this.medLevelFeatureStore = medLevelFeatureStore;
    this.firmFeatureStore = firmFeatureStore;
    this.attorneyFeatureStore = attorneyFeatureStore;
    this.caseStatusFeatureStore = caseStatusFeatureStore;
    this.caseTypeFeatureStore = caseTypeFeatureStore;
    this.patientTreatmentStatusFeatureStore = patientTreatmentStatusFeatureStore;
    this.caseProgressStatusFeatureStore = caseProgressStatusFeatureStore;
    this.adverseInsuranceStatusFeatureStore = adverseInsuranceStatusFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'accidentType.name',
      headerName: 'Accident Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medLevel.name',
      headerName: 'Med Level',
      filter: 'agTextColumnFilter'
    }, {
      field: 'firm.name',
      headerName: 'Firm',
      filter: 'agTextColumnFilter'
    }, {
      field: 'attorney.name',
      headerName: 'Attorney',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseStatus.name',
      headerName: 'Case Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseType.name',
      headerName: 'Case Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientTreatmentStatus.name',
      headerName: 'Patient Treatment Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseProgressStatus.name',
      headerName: 'Case Progress Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'adverseInsuranceStatus.name',
      headerName: 'Adverse Insurance Status',
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
      field: 'accidentTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medLevelId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'firmId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'attorneyId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'agentId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'caseTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientTreatmentStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medicalRecordNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'pharmacyControlNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'pchGroupNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateOfLoss',
      filter: 'agDateColumnFilter'
    }, {
      field: 'caseStatusDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'caseStatusOther',
      filter: 'agTextColumnFilter'
    }, {
      field: 'paralegal',
      filter: 'agTextColumnFilter'
    }, {
      field: 'paralegalContact',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseNoteSummary',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Policy Limit',
      field: 'policyLimit',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.policyLimit, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Attorney Fee',
      field: 'attorneyFee',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.attorneyFee, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'referringPhysician',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'No More Treatment',
      field: 'noMoreTreatment',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Medpay',
      field: 'medpay',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'fileNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accidentState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'assignedTo',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Attorney Paid',
      field: 'attorneyPaid',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'attorneySentDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Write off',
      field: 'writeOff',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'No MRI',
      field: 'noMRI',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'No PT',
      field: 'noPT',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'No First Appointment',
      field: 'noFirstAppointment',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Hot',
      field: 'hot',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Documents Uploaded',
      field: 'documentsUploaded',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Attorney Review',
      field: 'attorneyReview',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Escalated Review',
      field: 'escalatedReview',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'In Active',
      field: 'inActive',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Criteria 1712',
      field: 'criteria1712',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'documentUploadedDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'patientDischargedGatheringRecordsDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'resubmitted',
      filter: 'agDateColumnFilter'
    }, {
      field: 'caseProgressStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'firmCaseManager',
      filter: 'agTextColumnFilter'
    }, {
      field: 'adverseInsuranceStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'createdBy',
      filter: 'agTextColumnFilter'
    }, {
      field: 'renegotiatePayOffDate',
      filter: 'agDateColumnFilter'
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadLegalCasesEffect();
    this.store.filterAccidentTypes('').subscribe();
    this.store.filterPatients('').subscribe();
    this.store.filterMedLevels('').subscribe();
    this.store.filterFirms('').subscribe();
    this.store.filterAttorneys('').subscribe();
    this.store.filterCaseStatuses('').subscribe();
    this.store.filterCaseTypes('').subscribe();
    this.store.filterPatientTreatmentStatuses('').subscribe();
    this.store.filterCaseProgressStatuses('').subscribe();
    this.store.filterAdverseInsuranceStatuses('').subscribe();
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
        case 'medLevel':
          {
            const medLevelCreateActionResultListener = this.medLevelFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addMedLevel(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                medLevelCreateActionResultListener.unsubscribe();
              }
            });
            this.medLevelFeatureStore.createMedLevelEffect({
              name: newName
            });
            break;
          }
        case 'firm':
          {
            const firmCreateActionResultListener = this.firmFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addFirm(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                firmCreateActionResultListener.unsubscribe();
              }
            });
            this.firmFeatureStore.createFirmEffect({
              name: newName
            });
            break;
          }
        case 'attorney':
          {
            const attorneyCreateActionResultListener = this.attorneyFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAttorney(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                attorneyCreateActionResultListener.unsubscribe();
              }
            });
            this.attorneyFeatureStore.createAttorneyEffect({
              name: newName
            });
            break;
          }
        case 'caseStatus':
          {
            const caseStatusCreateActionResultListener = this.caseStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addCaseStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                caseStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.caseStatusFeatureStore.createCaseStatusEffect({
              name: newName
            });
            break;
          }
        case 'caseType':
          {
            const caseTypeCreateActionResultListener = this.caseTypeFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addCaseType(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                caseTypeCreateActionResultListener.unsubscribe();
              }
            });
            this.caseTypeFeatureStore.createCaseTypeEffect({
              name: newName
            });
            break;
          }
        case 'patientTreatmentStatus':
          {
            const patientTreatmentStatusCreateActionResultListener = this.patientTreatmentStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addPatientTreatmentStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                patientTreatmentStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.patientTreatmentStatusFeatureStore.createPatientTreatmentStatusEffect({
              name: newName
            });
            break;
          }
        case 'caseProgressStatus':
          {
            const caseProgressStatusCreateActionResultListener = this.caseProgressStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addCaseProgressStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                caseProgressStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.caseProgressStatusFeatureStore.createCaseProgressStatusEffect({
              name: newName
            });
            break;
          }
        case 'adverseInsuranceStatus':
          {
            const adverseInsuranceStatusCreateActionResultListener = this.adverseInsuranceStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAdverseInsuranceStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                adverseInsuranceStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.adverseInsuranceStatusFeatureStore.createAdverseInsuranceStatusEffect({
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
    this.store.loadLegalCasesEffect();
  }
}
WebLegalCaseListComponent.ɵfac = function WebLegalCaseListComponent_Factory(t) {
  return new (t || WebLegalCaseListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_3__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_accident_type_shared__WEBPACK_IMPORTED_MODULE_4__.WebAccidentTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_5__.WebPatientFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_med_level_shared__WEBPACK_IMPORTED_MODULE_6__.WebMedLevelFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_firm_shared__WEBPACK_IMPORTED_MODULE_7__.WebFirmFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_attorney_shared__WEBPACK_IMPORTED_MODULE_8__.WebAttorneyFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_9__.WebCaseStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_type_shared__WEBPACK_IMPORTED_MODULE_10__.WebCaseTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_patient_treatment_status_shared__WEBPACK_IMPORTED_MODULE_11__.WebPatientTreatmentStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_progress_status_shared__WEBPACK_IMPORTED_MODULE_12__.WebCaseProgressStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_adverse_insurance_status_shared__WEBPACK_IMPORTED_MODULE_13__.WebAdverseInsuranceStatusFeatureStore));
};
WebLegalCaseListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLegalCaseListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebLegalCaseListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_legal_case_ui__WEBPACK_IMPORTED_MODULE_14__.WebLegalCaseSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_3__.WebLegalCaseFeatureStore, _case_clinical_web_accident_type_shared__WEBPACK_IMPORTED_MODULE_4__.WebAccidentTypeFeatureStore, _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_5__.WebPatientFeatureStore, _case_clinical_web_med_level_shared__WEBPACK_IMPORTED_MODULE_6__.WebMedLevelFeatureStore, _case_clinical_web_firm_shared__WEBPACK_IMPORTED_MODULE_7__.WebFirmFeatureStore, _case_clinical_web_attorney_shared__WEBPACK_IMPORTED_MODULE_8__.WebAttorneyFeatureStore, _case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_9__.WebCaseStatusFeatureStore, _case_clinical_web_case_type_shared__WEBPACK_IMPORTED_MODULE_10__.WebCaseTypeFeatureStore, _case_clinical_web_patient_treatment_status_shared__WEBPACK_IMPORTED_MODULE_11__.WebPatientTreatmentStatusFeatureStore, _case_clinical_web_case_progress_status_shared__WEBPACK_IMPORTED_MODULE_12__.WebCaseProgressStatusFeatureStore, _case_clinical_web_adverse_insurance_status_shared__WEBPACK_IMPORTED_MODULE_13__.WebAdverseInsuranceStatusFeatureStore])],
  decls: 1,
  vars: 1,
  consts: [[4, "featureFlag"], [4, "ngIf"], ["tableName", "legalCase", "title", "LegalCase", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "searchQueryDidChange", "excelDataHasBeenPopulated"]],
  template: function WebLegalCaseListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebLegalCaseListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "LegalCase.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_16__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_17__.WebDataListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 385244:
/*!***********************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-list/web-legal-case-list.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseListModule": () => (/* binding */ WebLegalCaseListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_legal_case_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-legal-case-list.component */ 705679);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebLegalCaseListModule {}
WebLegalCaseListModule.ɵfac = function WebLegalCaseListModule_Factory(t) {
  return new (t || WebLegalCaseListModule)();
};
WebLegalCaseListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebLegalCaseListModule
});
WebLegalCaseListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_legal_case_list_component__WEBPACK_IMPORTED_MODULE_3__.WebLegalCaseListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebLegalCaseListModule, {
    declarations: [_web_legal_case_list_component__WEBPACK_IMPORTED_MODULE_3__.WebLegalCaseListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule]
  });
})();

/***/ }),

/***/ 336734:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/legal-case/ui/web-legal-case-select-form/web-legal-case-select-table-view.component.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseSelectTableViewComponent": () => (/* binding */ WebLegalCaseSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebLegalCaseSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.legalCases = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'accidentType.name',
      headerName: 'Accident Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medLevel.name',
      headerName: 'Med Level',
      filter: 'agTextColumnFilter'
    }, {
      field: 'firm.name',
      headerName: 'Firm',
      filter: 'agTextColumnFilter'
    }, {
      field: 'attorney.name',
      headerName: 'Attorney',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseStatus.name',
      headerName: 'Case Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseType.name',
      headerName: 'Case Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientTreatmentStatus.name',
      headerName: 'Patient Treatment Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseProgressStatus.name',
      headerName: 'Case Progress Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'adverseInsuranceStatus.name',
      headerName: 'Adverse Insurance Status',
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
      field: 'accidentTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medLevelId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'firmId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'attorneyId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'agentId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'caseTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientTreatmentStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medicalRecordNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'pharmacyControlNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'pchGroupNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateOfLoss',
      filter: 'agDateColumnFilter'
    }, {
      field: 'caseStatusDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'caseStatusOther',
      filter: 'agTextColumnFilter'
    }, {
      field: 'paralegal',
      filter: 'agTextColumnFilter'
    }, {
      field: 'paralegalContact',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseNoteSummary',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Policy Limit',
      field: 'policyLimit',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.policyLimit, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Attorney Fee',
      field: 'attorneyFee',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.attorneyFee, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'referringPhysician',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'No More Treatment',
      field: 'noMoreTreatment',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Medpay',
      field: 'medpay',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'fileNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accidentState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'assignedTo',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Attorney Paid',
      field: 'attorneyPaid',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'attorneySentDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Write off',
      field: 'writeOff',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'No MRI',
      field: 'noMRI',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'No PT',
      field: 'noPT',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'No First Appointment',
      field: 'noFirstAppointment',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Hot',
      field: 'hot',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Documents Uploaded',
      field: 'documentsUploaded',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Attorney Review',
      field: 'attorneyReview',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Escalated Review',
      field: 'escalatedReview',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'In Active',
      field: 'inActive',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Criteria 1712',
      field: 'criteria1712',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'documentUploadedDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'patientDischargedGatheringRecordsDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'resubmitted',
      filter: 'agDateColumnFilter'
    }, {
      field: 'caseProgressStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'firmCaseManager',
      filter: 'agTextColumnFilter'
    }, {
      field: 'adverseInsuranceStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'createdBy',
      filter: 'agTextColumnFilter'
    }, {
      field: 'renegotiatePayOffDate',
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
WebLegalCaseSelectTableViewComponent.ɵfac = function WebLegalCaseSelectTableViewComponent_Factory(t) {
  return new (t || WebLegalCaseSelectTableViewComponent)();
};
WebLegalCaseSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLegalCaseSelectTableViewComponent,
  selectors: [["ui-legal-case-select-table-view"]],
  viewQuery: function WebLegalCaseSelectTableViewComponent_Query(rf, ctx) {
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
    legalCases: "legalCases"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebLegalCaseSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebLegalCaseSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebLegalCaseSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.legalCases)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
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