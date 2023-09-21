"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_prior-authorization-request_feature_src_lib_web-prior-authorization-request-list_web-ee8f70"],{

/***/ 304060:
/*!*****************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/feature/src/lib/web-prior-authorization-request-list/web-prior-authorization-request-list.component.ts ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationRequestListComponent": () => (/* binding */ WebPriorAuthorizationRequestListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_prior_authorization_request_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/prior-authorization-request/shared */ 212129);
/* harmony import */ var _case_clinical_web_prior_authorization_request_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/prior-authorization-request/ui */ 876652);
/* harmony import */ var _case_clinical_web_procedure_site_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/procedure-site/shared */ 817955);
/* harmony import */ var _case_clinical_web_surgical_position_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/surgical-position/shared */ 487885);
/* harmony import */ var _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/clinical-provider/shared */ 19494);
/* harmony import */ var _case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/visit-kind/shared */ 423818);
/* harmony import */ var _case_clinical_web_guideline_used_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/guideline-used/shared */ 92154);
/* harmony import */ var _case_clinical_web_authorization_kind_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/authorization-kind/shared */ 154500);
/* harmony import */ var _case_clinical_web_authorization_status_shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/authorization-status/shared */ 243205);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);
/* harmony import */ var _case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/case-procedure/shared */ 87804);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




























function WebPriorAuthorizationRequestListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebPriorAuthorizationRequestListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebPriorAuthorizationRequestListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r4.priorAuthorizationRequests)("columnDefs", ctx_r3.columnDefs)("validateFunc", ctx_r3.validateImportData)("createNewFunc", ctx_r3.createNewFunc)("cardViewTemplate", _r1);
  }
}
function WebPriorAuthorizationRequestListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebPriorAuthorizationRequestListComponent_ng_container_0_ng_container_1_Template, 2, 5, "ng-container", 2);
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
function WebPriorAuthorizationRequestListComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-json-form", 4);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "priorAuthorizationRequests_kanban_list")("showSubmitButton", false)("model", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c0))("componentStore", ctx_r2.store)("formData", ctx_r2.formData);
  }
}
class WebPriorAuthorizationRequestListComponent {
  constructor(store, procedureSiteFeatureStore, surgicalPositionFeatureStore, clinicalProviderFeatureStore, visitKindFeatureStore, guidelineUsedFeatureStore, authorizationKindFeatureStore, authorizationStatusFeatureStore, patientFeatureStore, caseProcedureFeatureStore) {
    this.store = store;
    this.procedureSiteFeatureStore = procedureSiteFeatureStore;
    this.surgicalPositionFeatureStore = surgicalPositionFeatureStore;
    this.clinicalProviderFeatureStore = clinicalProviderFeatureStore;
    this.visitKindFeatureStore = visitKindFeatureStore;
    this.guidelineUsedFeatureStore = guidelineUsedFeatureStore;
    this.authorizationKindFeatureStore = authorizationKindFeatureStore;
    this.authorizationStatusFeatureStore = authorizationStatusFeatureStore;
    this.patientFeatureStore = patientFeatureStore;
    this.caseProcedureFeatureStore = caseProcedureFeatureStore;
    this.vm$ = this.store.vm$;
    this.formData = {
      priorAuthRequests: this.store.priorAuthorizationRequests$
    };
    this.columnDefs = [{
      field: 'procedureSite.name',
      headerName: 'Procedure Site',
      filter: 'agTextColumnFilter'
    }, {
      field: 'surgicalPosition.name',
      headerName: 'Surgical Position',
      filter: 'agTextColumnFilter'
    }, {
      field: 'treatingProvider.name',
      headerName: 'Treating Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referredTo.name',
      headerName: 'Referred to',
      filter: 'agTextColumnFilter'
    }, {
      field: 'prescription.name',
      headerName: 'Prescription',
      filter: 'agTextColumnFilter'
    }, {
      field: 'visitKind.name',
      headerName: 'Visit Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'guidelineUsed.name',
      headerName: 'Guideline Used',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorizationKind.name',
      headerName: 'Authorization Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorizationStatus.name',
      headerName: 'Authorization Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'bill.name',
      headerName: 'Bill',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medicalReport.name',
      headerName: 'Medical Report',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseProcedure.name',
      headerName: 'Case Procedure',
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
      field: 'referredOn',
      filter: 'agDateColumnFilter'
    }, {
      field: 'approvedOn',
      filter: 'agDateColumnFilter'
    }, {
      field: 'effectiveAsOf',
      filter: 'agDateColumnFilter'
    }, {
      field: 'expiresOn',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Duration',
      field: 'duration',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.duration, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'procedureSiteId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'surgicalPositionId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'procedureDescription',
      filter: 'agTextColumnFilter'
    }, {
      field: 'remarks',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Underwriting Approved',
      field: 'underwritingApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Tpa Approved',
      field: 'tpaApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Requires Medical Director',
      field: 'requiresMedicalDirector',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'reviewedOn',
      filter: 'agDateColumnFilter'
    }, {
      field: 'treatingProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'referredToId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseManager',
      filter: 'agTextColumnFilter'
    }, {
      field: 'memberNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medicalDirector',
      filter: 'agTextColumnFilter'
    }, {
      field: 'tpaApprover',
      filter: 'agTextColumnFilter'
    }, {
      field: 'underwriter',
      filter: 'agTextColumnFilter'
    }, {
      field: 'prescriptionId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'visitKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'guidelineUsedId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'guidelineRequires',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorizationKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'authorizationStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'billId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medicalReportId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'caseProcedureId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadPriorAuthorizationRequestsEffect();
    this.store.filterProcedureSites('').subscribe();
    this.store.filterSurgicalPositions('').subscribe();
    this.store.filterClinicalProviders('').subscribe();
    this.store.filterDocuments('').subscribe();
    this.store.filterVisitKinds('').subscribe();
    this.store.filterGuidelineUseds('').subscribe();
    this.store.filterAuthorizationKinds('').subscribe();
    this.store.filterAuthorizationStatuses('').subscribe();
    this.store.filterPatients('').subscribe();
    this.store.filterCaseProcedures('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      switch (type) {
        case 'procedureSite':
          {
            const procedureSiteCreateActionResultListener = this.procedureSiteFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addProcedureSite(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                procedureSiteCreateActionResultListener.unsubscribe();
              }
            });
            this.procedureSiteFeatureStore.createProcedureSiteEffect({
              name: newName
            });
            break;
          }
        case 'surgicalPosition':
          {
            const surgicalPositionCreateActionResultListener = this.surgicalPositionFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addSurgicalPosition(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                surgicalPositionCreateActionResultListener.unsubscribe();
              }
            });
            this.surgicalPositionFeatureStore.createSurgicalPositionEffect({
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
        case 'guidelineUsed':
          {
            const guidelineUsedCreateActionResultListener = this.guidelineUsedFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addGuidelineUsed(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                guidelineUsedCreateActionResultListener.unsubscribe();
              }
            });
            this.guidelineUsedFeatureStore.createGuidelineUsedEffect({
              name: newName
            });
            break;
          }
        case 'authorizationKind':
          {
            const authorizationKindCreateActionResultListener = this.authorizationKindFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAuthorizationKind(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                authorizationKindCreateActionResultListener.unsubscribe();
              }
            });
            this.authorizationKindFeatureStore.createAuthorizationKindEffect({
              name: newName
            });
            break;
          }
        case 'authorizationStatus':
          {
            const authorizationStatusCreateActionResultListener = this.authorizationStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAuthorizationStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                authorizationStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.authorizationStatusFeatureStore.createAuthorizationStatusEffect({
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
    this.store.loadPriorAuthorizationRequestsEffect();
  }
}
WebPriorAuthorizationRequestListComponent.ɵfac = function WebPriorAuthorizationRequestListComponent_Factory(t) {
  return new (t || WebPriorAuthorizationRequestListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_prior_authorization_request_shared__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationRequestFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_site_shared__WEBPACK_IMPORTED_MODULE_4__.WebProcedureSiteFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_surgical_position_shared__WEBPACK_IMPORTED_MODULE_5__.WebSurgicalPositionFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_6__.WebClinicalProviderFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_7__.WebVisitKindFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_guideline_used_shared__WEBPACK_IMPORTED_MODULE_8__.WebGuidelineUsedFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_authorization_kind_shared__WEBPACK_IMPORTED_MODULE_9__.WebAuthorizationKindFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_authorization_status_shared__WEBPACK_IMPORTED_MODULE_10__.WebAuthorizationStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_11__.WebPatientFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_12__.WebCaseProcedureFeatureStore));
};
WebPriorAuthorizationRequestListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationRequestListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebPriorAuthorizationRequestListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_prior_authorization_request_ui__WEBPACK_IMPORTED_MODULE_13__.WebPriorAuthorizationRequestSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_prior_authorization_request_shared__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationRequestFeatureStore, _case_clinical_web_procedure_site_shared__WEBPACK_IMPORTED_MODULE_4__.WebProcedureSiteFeatureStore, _case_clinical_web_surgical_position_shared__WEBPACK_IMPORTED_MODULE_5__.WebSurgicalPositionFeatureStore, _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_6__.WebClinicalProviderFeatureStore, _case_clinical_web_visit_kind_shared__WEBPACK_IMPORTED_MODULE_7__.WebVisitKindFeatureStore, _case_clinical_web_guideline_used_shared__WEBPACK_IMPORTED_MODULE_8__.WebGuidelineUsedFeatureStore, _case_clinical_web_authorization_kind_shared__WEBPACK_IMPORTED_MODULE_9__.WebAuthorizationKindFeatureStore, _case_clinical_web_authorization_status_shared__WEBPACK_IMPORTED_MODULE_10__.WebAuthorizationStatusFeatureStore, _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_11__.WebPatientFeatureStore, _case_clinical_web_case_procedure_shared__WEBPACK_IMPORTED_MODULE_12__.WebCaseProcedureFeatureStore])],
  decls: 3,
  vars: 1,
  consts: [[4, "featureFlag"], ["cardViewTemplate", ""], [4, "ngIf"], ["tableName", "priorAuthorizationRequest", "title", "PriorAuthorizationRequest", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "cardViewTemplate", "searchQueryDidChange", "excelDataHasBeenPopulated"], [1, "w-full", "h-full", 3, "formName", "showSubmitButton", "model", "componentStore", "formData"]],
  template: function WebPriorAuthorizationRequestListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebPriorAuthorizationRequestListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebPriorAuthorizationRequestListComponent_ng_template_1_Template, 1, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "PriorAuthorizationRequest.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_15__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_16__.WebDataListComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_17__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 900246:
/*!**************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/feature/src/lib/web-prior-authorization-request-list/web-prior-authorization-request-list.module.ts ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationRequestListModule": () => (/* binding */ WebPriorAuthorizationRequestListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_prior_authorization_request_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-prior-authorization-request-list.component */ 304060);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);










class WebPriorAuthorizationRequestListModule {}
WebPriorAuthorizationRequestListModule.ɵfac = function WebPriorAuthorizationRequestListModule_Factory(t) {
  return new (t || WebPriorAuthorizationRequestListModule)();
};
WebPriorAuthorizationRequestListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebPriorAuthorizationRequestListModule
});
WebPriorAuthorizationRequestListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_prior_authorization_request_list_component__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationRequestListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.WebUiFormModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebPriorAuthorizationRequestListModule, {
    declarations: [_web_prior_authorization_request_list_component__WEBPACK_IMPORTED_MODULE_3__.WebPriorAuthorizationRequestListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.WebUiFormModule]
  });
})();

/***/ }),

/***/ 876652:
/*!************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/ui/web-prior-authorization-request-select-form/web-prior-authorization-request-select-table-view.component.ts ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationRequestSelectTableViewComponent": () => (/* binding */ WebPriorAuthorizationRequestSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthorizationRequestSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthorizationRequests = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'procedureSite.name',
      headerName: 'Procedure Site',
      filter: 'agTextColumnFilter'
    }, {
      field: 'surgicalPosition.name',
      headerName: 'Surgical Position',
      filter: 'agTextColumnFilter'
    }, {
      field: 'treatingProvider.name',
      headerName: 'Treating Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referredTo.name',
      headerName: 'Referred to',
      filter: 'agTextColumnFilter'
    }, {
      field: 'prescription.name',
      headerName: 'Prescription',
      filter: 'agTextColumnFilter'
    }, {
      field: 'visitKind.name',
      headerName: 'Visit Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'guidelineUsed.name',
      headerName: 'Guideline Used',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorizationKind.name',
      headerName: 'Authorization Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorizationStatus.name',
      headerName: 'Authorization Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'bill.name',
      headerName: 'Bill',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medicalReport.name',
      headerName: 'Medical Report',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseProcedure.name',
      headerName: 'Case Procedure',
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
      field: 'referredOn',
      filter: 'agDateColumnFilter'
    }, {
      field: 'approvedOn',
      filter: 'agDateColumnFilter'
    }, {
      field: 'effectiveAsOf',
      filter: 'agDateColumnFilter'
    }, {
      field: 'expiresOn',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Duration',
      field: 'duration',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.duration, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'procedureSiteId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'surgicalPositionId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'procedureDescription',
      filter: 'agTextColumnFilter'
    }, {
      field: 'remarks',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Underwriting Approved',
      field: 'underwritingApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Tpa Approved',
      field: 'tpaApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Requires Medical Director',
      field: 'requiresMedicalDirector',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'reviewedOn',
      filter: 'agDateColumnFilter'
    }, {
      field: 'treatingProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'referredToId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseManager',
      filter: 'agTextColumnFilter'
    }, {
      field: 'memberNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medicalDirector',
      filter: 'agTextColumnFilter'
    }, {
      field: 'tpaApprover',
      filter: 'agTextColumnFilter'
    }, {
      field: 'underwriter',
      filter: 'agTextColumnFilter'
    }, {
      field: 'prescriptionId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'visitKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'guidelineUsedId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'guidelineRequires',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorizationKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'authorizationStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'billId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medicalReportId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'caseProcedureId',
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
WebPriorAuthorizationRequestSelectTableViewComponent.ɵfac = function WebPriorAuthorizationRequestSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthorizationRequestSelectTableViewComponent)();
};
WebPriorAuthorizationRequestSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationRequestSelectTableViewComponent,
  selectors: [["ui-prior-authorization-request-select-table-view"]],
  viewQuery: function WebPriorAuthorizationRequestSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthorizationRequests: "priorAuthorizationRequests"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthorizationRequestSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthorizationRequestSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthorizationRequestSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthorizationRequests)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);