"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_legal-case_feature_src_lib_web-legal-case-detail_web-legal-case-detail_module_ts"],{

/***/ 598270:
/*!****************************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/negotiations/negotiations.component.store.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NegotiationsStore": () => (/* binding */ NegotiationsStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/case-status/shared */ 188497);














class NegotiationsStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(loading, toast, legalCaseStore, route, caseStatusStore, lastFiveLegalCaseStore) {
    super({
      query: "",
      loading: false
    });
    this.loading = loading;
    this.toast = toast;
    this.legalCaseStore = legalCaseStore;
    this.route = route;
    this.caseStatusStore = caseStatusStore;
    this.lastFiveLegalCaseStore = lastFiveLegalCaseStore;
    this.query$ = this.select(s => s.query);
    this.caseStatusId$ = this.select(s => s.caseStatusId);
    this.attorneyId$ = this.select(s => s.attorneyId);
    this.caseStatuses$ = this.caseStatusStore.caseStatuses$;
    this.loading$ = this.select(s => s.loading);
    this.legalCase$ = this.legalCaseStore.item$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(item => console.log(item)));
    this.lastLegalCases$ = this.lastFiveLegalCaseStore.legalCases$;
    this.input$ = this.select(this.query$, this.caseStatusId$, this.attorneyId$, (name, caseStatusId, attorneyId) => ({
      caseStatusId,
      attorneyId,
      name
    }));
    this.vm$ = this.select(this.loading$, this.legalCase$, (loading, legalCase) => ({
      loading,
      legalCase
    }));
    this.setSearchQuery = this.updater((state, query) => Object.assign(Object.assign({}, state), {
      query
    }));
    this.setCaseStatusId = this.updater((state, caseStatusId) => Object.assign(Object.assign({}, state), {
      caseStatusId
    }));
    this.setAttorneyId = this.updater((state, attorneyId) => Object.assign(Object.assign({}, state), {
      attorneyId
    }));
    this.loadLastLegalCasesEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.input$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([, input]) => {
      const {
        name,
        caseStatusId,
        attorneyId
      } = input;
      if (attorneyId) {
        this.lastFiveLegalCaseStore.setSearchQuery(name);
        this.lastFiveLegalCaseStore.setCaseStatusId(caseStatusId);
        this.lastFiveLegalCaseStore.setAttorneyId(attorneyId);
        this.lastFiveLegalCaseStore.loadLegalCasesEffect();
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(true);
    })));
    this.lastFiveLegalCaseStore.setLimit(5);
    const subscriber = this.legalCaseStore.item$.subscribe(item => {
      if (item) {
        subscriber.unsubscribe();
        if (item.attorneyId) {
          this.setAttorneyId(item.attorneyId);
          setTimeout(() => this.loadLastLegalCasesEffect(), 500);
        }
      }
    });
    this.legalCaseStore.loadLegalCaseEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.pluck)('legalCaseId')));
    this.caseStatusStore.loadCaseStatusesEffect();
  }
  searchQueryDidChange(query) {
    this.setSearchQuery(query);
    this.loadLastLegalCasesEffect();
  }
  caseStatusIdDidChange(caseStatusId) {
    this.setCaseStatusId(caseStatusId);
    this.loadLastLegalCasesEffect();
  }
  setOfferAddModalCtrl(ctrl) {
    this.offerAddModalCtrl = ctrl;
  }
  openOfferAddModal(data) {
    var _a;
    (_a = this.offerAddModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
      total: 300
    }, {}, this);
  }
}
NegotiationsStore.ɵfac = function NegotiationsStore_Factory(t) {
  return new (t || NegotiationsStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_9__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_11__.WebCaseStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"]('lastFiveLegalCaseStore'));
};
NegotiationsStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: NegotiationsStore,
  factory: NegotiationsStore.ɵfac
});

/***/ }),

/***/ 424469:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/negotiations/negotiations.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseNegotiationsComponent": () => (/* binding */ WebLegalCaseNegotiationsComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/case-status/shared */ 188497);
/* harmony import */ var _negotiations_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./negotiations.component.store */ 598270);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);









function WebLegalCaseNegotiationsComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ui-formly-json-form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.log(vm_r1.legalCase), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("componentStore", ctx_r0.store)("formData", ctx_r0.formData)("model", vm_r1.legalCase);
  }
}
class WebLegalCaseNegotiationsComponent {
  log(data) {
    console.log(data);
  }
  constructor(store, router, route) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.vm$ = this.store.vm$;
    this.formData = {
      lastLegalCases: this.store.lastLegalCases$,
      caseStatuses: this.store.caseStatuses$,
      "chips": [{
        "title": "CHIRO",
        "days": 23
      }, {
        "title": "PAIN MANAGEMENT",
        "days": 36
      }, {
        "title": "CHIRO1",
        "days": 32
      }, {
        "title": "CHIRO2",
        "days": 35
      }, {
        "title": "CHIRO3",
        "days": 39
      }, {
        "title": "TBI",
        "days": 12
      }],
      "messages": [{
        "date": "2023-12-11",
        "content": "This is message from John Doe at 2023/12/11",
        "sender": "John Doe"
      }, {
        "date": "2023-12-15",
        "content": "This is message from Felix at 2023/12/15",
        "sender": "Felix"
      }, {
        "date": "2023-12-19",
        "content": "This is message from Michael at 2023/12/19",
        "sender": "Michael"
      }],
      "cases": [{
        "patientName": "Beyonce Knowles",
        "dateOfLoss": "2016-01-16",
        "dateSettled": "2019-12-12",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }, {
        "patientName": "Mark Hamill",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }, {
        "patientName": "Judy Garland",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }, {
        "patientName": "Taylor Swift",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }],
      "bills": [{
        "providerName": "David Eldringhoff",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }, {
        "providerName": "Bay City Surgery Center",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }, {
        "providerName": "Total Outside Meds",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }, {
        "providerName": "Lien Total",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }],
      "microDecompressions": [{
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }, {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }],
      "visit": [{
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }, {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }],
      "filterItems": [{
        "id": "Written Off",
        "title": "Written Off"
      }, {
        "id": "All",
        "title": "All"
      }],
      "settlementValues": {},
      "invoices": [{
        "name": "Overview.pdf",
        "size": 135
      }, {
        "name": "Details.pdf",
        "size": 165
      }, {
        "name": "Conclusion.pdf",
        "size": 535
      }]
    };
  }
  ngOnInit() {
    console.log('ngOnInit');
  }
  ngOnDestroy() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
}
WebLegalCaseNegotiationsComponent.ɵfac = function WebLegalCaseNegotiationsComponent_Factory(t) {
  return new (t || WebLegalCaseNegotiationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_negotiations_component_store__WEBPACK_IMPORTED_MODULE_1__.NegotiationsStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute));
};
WebLegalCaseNegotiationsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLegalCaseNegotiationsComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_3__.WebLegalCaseFeatureStore, _negotiations_component_store__WEBPACK_IMPORTED_MODULE_1__.NegotiationsStore, _case_clinical_web_case_status_shared__WEBPACK_IMPORTED_MODULE_4__.WebCaseStatusFeatureStore, {
    provide: 'lastFiveLegalCaseStore',
    useClass: _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_3__.WebLegalCaseFeatureStore
  }])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "legalCase_negotiations", 3, "showSubmitButton", "componentStore", "formData", "model"]],
  template: function WebLegalCaseNegotiationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebLegalCaseNegotiationsComponent_ng_container_0_Template, 3, 5, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_6__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 594679:
/*!********************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/overview/overview.component.store.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewStore": () => (/* binding */ OverviewStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);













class OverviewStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(loading, toast, route, router, legalCaseStore, patientStore) {
    super({
      query: "",
      loading: false
    });
    this.loading = loading;
    this.toast = toast;
    this.route = route;
    this.router = router;
    this.legalCaseStore = legalCaseStore;
    this.patientStore = patientStore;
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.legalCaseStore.item$;
    this.vm$ = this.legalCaseStore.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(vm => console.log(vm)));
    this.legalCaseStore.loadLegalCaseEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.pluck)('legalCaseId')));
    this.subscriber = this.legalCaseStore.actionResult$.subscribe(({
      done,
      item
    }) => {
      // if(done) {
      //   this.router.navigate(['./'], {relativeTo: this.route});
      // }
    });
  }
  updateFundingApproved(input) {
    const {
      id,
      name,
      procedureId,
      contractId,
      vendorId,
      statusId,
      estimate,
      fundingApproved
    } = input;
    this.legalCaseStore.updateFundingApproved({
      input: {
        id,
        name,
        procedureId,
        contractId,
        vendorId,
        statusId,
        estimate,
        fundingApproved
      }
    });
  }
  deleteLegalCase() {
    this.legalCaseStore.deleteLegalCaseEffect();
  }
  ngOnDestroy() {
    //this.unsubscribe();
  }
  unsubscribe() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  /* Patient Edit */
  setPatientModalCtrl(ctrl) {
    this.patientModalCtrl = ctrl;
  }
  openPatientModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      this.currentLegalCaseItem = item;
      (_a = this.patientModalCtrl) === null || _a === void 0 ? void 0 : _a.open(Object.assign({}, item === null || item === void 0 ? void 0 : item.patient), {}, this);
    }).unsubscribe();
  }
  updatePatientEffect(formData) {
    var _a, _b;
    console.log("patient-formData", formData);
    const {
      id,
      name,
      firstName,
      middleName,
      lastName,
      suffix,
      dateOfBirth,
      primaryPhoneNumber,
      primaryEmailAddress,
      primaryAddressLine1,
      primaryAddressLine2,
      primaryAddressCity,
      primaryAddressStateOrProvince,
      primaryAddressPostalCode,
      latitude,
      longitude,
      workAddressLine1,
      workAddressLine2,
      workAddressCity,
      workAddressStateOrProvince,
      workAddressPostalCode,
      workLatitude,
      workLongitude
    } = formData;
    this.patientStore.updatePatientEffect({
      id,
      name,
      firstName,
      middleName,
      lastName,
      suffix,
      dateOfBirth,
      primaryPhoneNumber,
      primaryEmailAddress,
      primaryAddressLine1,
      primaryAddressLine2,
      primaryAddressCity,
      primaryAddressStateOrProvince,
      primaryAddressPostalCode,
      latitude,
      longitude,
      workAddressLine1,
      workAddressLine2,
      workAddressCity,
      workAddressStateOrProvince,
      workAddressPostalCode,
      workLatitude,
      workLongitude
    });
    (_a = this.patientModalCtrl) === null || _a === void 0 ? void 0 : _a.close();
    this.legalCaseStore.loadLegalCaseEffect((_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.id);
  }
  /* Legal Case Edit */
  setLegalCaseModalCtrl(ctrl) {
    this.legalCaseModalCtrl = ctrl;
  }
  openLegalCaseModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      this.currentLegalCaseItem = item;
      (_a = this.legalCaseModalCtrl) === null || _a === void 0 ? void 0 : _a.open(Object.assign({}, item), {}, this);
    }).unsubscribe();
  }
  updateLegalCaseEffect(formData) {
    var _a, _b, _c;
    const {
      id,
      name,
      accidentTypeId,
      patientId,
      medLevelId,
      firmId,
      attorneyId,
      agentId,
      caseStatusId,
      medicalRecordNumber,
      pchGroupNumber,
      propertyDamages,
      pharmacyControlNumber,
      caseTypeId,
      patientTreatmentStatusId,
      dateOfLoss,
      caseStatusDate,
      caseStatusOther,
      paralegal,
      paralegalContact,
      caseNoteSummary,
      policyLimit,
      attorneyFee,
      referringPhysician,
      noMoreTreatment,
      medpay,
      fileNumber,
      caseNumber,
      accidentState,
      assignedTo,
      attorneyPaid,
      attorneySentDate,
      writeOff,
      noMRI,
      noPT,
      noFirstAppointment,
      hot,
      documentsUploaded,
      attorneyReview,
      escalatedReview,
      inActive,
      criteria1712,
      documentUploadedDate,
      patientDischargedGatheringRecordsDate,
      resubmitted,
      caseProgressStatusId,
      firmCaseManager,
      adverseInsuranceStatusId,
      createdBy,
      renegotiatePayOffDate
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name,
      accidentTypeId,
      patientId,
      medLevelId,
      firmId,
      attorneyId,
      agentId,
      caseStatusId,
      medicalRecordNumber,
      pchGroupNumber,
      propertyDamages,
      pharmacyControlNumber,
      caseTypeId,
      patientTreatmentStatusId,
      dateOfLoss,
      caseStatusDate,
      caseStatusOther,
      paralegal,
      paralegalContact,
      caseNoteSummary,
      policyLimit,
      attorneyFee,
      referringPhysician,
      noMoreTreatment,
      medpay,
      fileNumber,
      caseNumber,
      accidentState,
      assignedTo,
      attorneyPaid,
      attorneySentDate,
      writeOff,
      noMRI,
      noPT,
      noFirstAppointment,
      hot,
      documentsUploaded,
      attorneyReview,
      escalatedReview,
      inActive,
      criteria1712,
      documentUploadedDate,
      patientDischargedGatheringRecordsDate,
      resubmitted,
      caseProgressStatusId,
      firmCaseManager,
      adverseInsuranceStatusId,
      createdBy,
      renegotiatePayOffDate
    });
    (_b = this.legalCaseModalCtrl) === null || _b === void 0 ? void 0 : _b.close();
    this.legalCaseStore.loadLegalCaseEffect((_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.id);
  }
  /* Legal Case Edit */
  /* Under Writing Edit */
  setUnderWritingModalCtrl(ctrl) {
    this.underWritingModalCtrl = ctrl;
  }
  openUnderWritingModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      console.log('legalCaseStore-detail', item);
      const {
        underwriting_dateCreated,
        underwriting_lastUpdateDate,
        underwriting_timeSensitive,
        underwriting_needsMoreInfo,
        underwriting_billsAttached,
        underwriting_completedMedRecs,
        underwriting_balance,
        underwriting_signedLien,
        underwriting_procedureRequested,
        underwriting_medBills,
        underwriting_estimate,
        underwriting_plaintiff,
        underwriting_covered,
        underwriting_remarks
      } = item;
      this.currentLegalCaseItem = item;
      (_a = this.underWritingModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
        underwriting_dateCreated,
        underwriting_lastUpdateDate,
        underwriting_timeSensitive,
        underwriting_needsMoreInfo,
        underwriting_billsAttached,
        underwriting_completedMedRecs,
        underwriting_balance,
        underwriting_signedLien,
        underwriting_procedureRequested,
        underwriting_medBills,
        underwriting_estimate,
        underwriting_plaintiff,
        underwriting_covered,
        underwriting_remarks
      }, {}, this);
    }).unsubscribe();
  }
  updateUnderWritingModal(formData) {
    var _a, _b, _c, _d, _e;
    const {
      underwriting_dateCreated,
      underwriting_lastUpdateDate,
      underwriting_timeSensitive,
      underwriting_needsMoreInfo,
      underwriting_billsAttached,
      underwriting_completedMedRecs,
      underwriting_balance,
      underwriting_signedLien,
      underwriting_procedureRequested,
      underwriting_medBills,
      underwriting_estimate,
      underwriting_plaintiff,
      underwriting_covered,
      underwriting_remarks
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name: (_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.name,
      firmId: (_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.firmId,
      patientId: (_d = this.currentLegalCaseItem) === null || _d === void 0 ? void 0 : _d.patientId,
      underwriting_dateCreated,
      underwriting_lastUpdateDate,
      underwriting_timeSensitive,
      underwriting_needsMoreInfo,
      underwriting_billsAttached,
      underwriting_completedMedRecs,
      underwriting_balance,
      underwriting_signedLien,
      underwriting_procedureRequested,
      underwriting_medBills,
      underwriting_estimate,
      underwriting_plaintiff,
      underwriting_covered,
      underwriting_remarks
    });
    (_e = this.underWritingModalCtrl) === null || _e === void 0 ? void 0 : _e.close();
    //this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)
  }
  /* Under Writing Edit */
  /* Accident Information Edit */
  setAccidentInformationModalCtrl(ctrl) {
    this.accidentInformationModalCtrl = ctrl;
  }
  openAccidentInformationModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      console.log('legalCaseStore-detail', item);
      const {
        accidentInformation_accidentDescription,
        accidentInformation_dateOfLoss,
        accidentInformation_review,
        accidentInformation_initialEvaluation,
        accidentInformation_evaluation,
        accidentInformation_evaluationAfterHowLong,
        accidentInformation_evaluatedIn,
        accidentInformation_complaints,
        accidentInformation_previousHistory,
        accidentInformation_gapInCare,
        accidentInformation_gapInCareWhen,
        accidentInformation_preExistingProblems,
        accidentInformation_priorInjuries,
        accidentInformation_otherInjuriesSince
      } = item;
      this.currentLegalCaseItem = item;
      (_a = this.accidentInformationModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
        accidentInformation_accidentDescription,
        accidentInformation_dateOfLoss,
        accidentInformation_review,
        accidentInformation_initialEvaluation,
        accidentInformation_evaluation,
        accidentInformation_evaluationAfterHowLong,
        accidentInformation_evaluatedIn,
        accidentInformation_complaints,
        accidentInformation_previousHistory,
        accidentInformation_gapInCare,
        accidentInformation_gapInCareWhen,
        accidentInformation_preExistingProblems,
        accidentInformation_priorInjuries,
        accidentInformation_otherInjuriesSince
      }, {}, this);
    }).unsubscribe();
  }
  updateAccidentInformationModal(formData) {
    var _a, _b, _c, _d, _e, _f;
    const {
      accidentInformation_accidentDescription,
      accidentInformation_dateOfLoss,
      accidentInformation_review,
      accidentInformation_initialEvaluation,
      accidentInformation_evaluation,
      accidentInformation_evaluationAfterHowLong,
      accidentInformation_evaluatedIn,
      accidentInformation_complaints,
      accidentInformation_previousHistory,
      accidentInformation_gapInCare,
      accidentInformation_gapInCareWhen,
      accidentInformation_preExistingProblems,
      accidentInformation_priorInjuries,
      accidentInformation_otherInjuriesSince
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name: (_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.name,
      firmId: (_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.firmId,
      patientId: (_d = this.currentLegalCaseItem) === null || _d === void 0 ? void 0 : _d.patientId,
      accidentInformation_accidentDescription,
      accidentInformation_dateOfLoss,
      accidentInformation_review,
      accidentInformation_initialEvaluation,
      accidentInformation_evaluation,
      accidentInformation_evaluationAfterHowLong,
      accidentInformation_evaluatedIn,
      accidentInformation_complaints,
      accidentInformation_previousHistory,
      accidentInformation_gapInCare,
      accidentInformation_gapInCareWhen,
      accidentInformation_preExistingProblems,
      accidentInformation_priorInjuries,
      accidentInformation_otherInjuriesSince
    });
    (_e = this.accidentInformationModalCtrl) === null || _e === void 0 ? void 0 : _e.close();
    this.legalCaseStore.loadLegalCaseEffect((_f = this.currentLegalCaseItem) === null || _f === void 0 ? void 0 : _f.id);
  }
  /* Accident Information Edit */
  /* MVA Edit */
  setMVAModalCtrl(ctrl) {
    this.MVAModalCtrl = ctrl;
  }
  openMVAModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      console.log('legalCaseStore-detail', item);
      const {
        motorVehicleAccident_mvaDriver,
        motorVehicleAccident_mvaPassenger,
        motorVehicleAccident_mvaVehicle,
        motorVehicleAccident_mvaClaimants,
        motorVehicleAccident_mvaOperable,
        motorVehicleAccident_mvaTar,
        motorVehicleAccident_mvaDamage,
        motorVehicleAccident_mvaLess,
        motorVehicleAccident_mvaGreater,
        motorVehicleAccident_mvaAmount
      } = item;
      this.currentLegalCaseItem = item;
      (_a = this.MVAModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
        motorVehicleAccident_mvaDriver,
        motorVehicleAccident_mvaPassenger,
        motorVehicleAccident_mvaVehicle,
        motorVehicleAccident_mvaClaimants,
        motorVehicleAccident_mvaOperable,
        motorVehicleAccident_mvaTar,
        motorVehicleAccident_mvaDamage,
        motorVehicleAccident_mvaLess,
        motorVehicleAccident_mvaGreater,
        motorVehicleAccident_mvaAmount
      }, {}, this);
    }).unsubscribe();
  }
  updateMVAModal(formData) {
    var _a, _b, _c, _d, _e, _f;
    const {
      motorVehicleAccident_mvaDriver,
      motorVehicleAccident_mvaPassenger,
      motorVehicleAccident_mvaVehicle,
      motorVehicleAccident_mvaClaimants,
      motorVehicleAccident_mvaOperable,
      motorVehicleAccident_mvaTar,
      motorVehicleAccident_mvaDamage,
      motorVehicleAccident_mvaLess,
      motorVehicleAccident_mvaGreater,
      motorVehicleAccident_mvaAmount
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name: (_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.name,
      firmId: (_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.firmId,
      patientId: (_d = this.currentLegalCaseItem) === null || _d === void 0 ? void 0 : _d.patientId,
      motorVehicleAccident_mvaDriver,
      motorVehicleAccident_mvaPassenger,
      motorVehicleAccident_mvaVehicle,
      motorVehicleAccident_mvaClaimants,
      motorVehicleAccident_mvaOperable,
      motorVehicleAccident_mvaTar,
      motorVehicleAccident_mvaDamage,
      motorVehicleAccident_mvaLess,
      motorVehicleAccident_mvaGreater,
      motorVehicleAccident_mvaAmount
    });
    this.legalCaseStore.loadLegalCaseEffect((_e = this.currentLegalCaseItem) === null || _e === void 0 ? void 0 : _e.id);
    (_f = this.MVAModalCtrl) === null || _f === void 0 ? void 0 : _f.close();
  }
  /* MVA Edit */
  /* Premise Accident Edit */
  setPremiseAccidentModalCtrl(ctrl) {
    this.premiseAccidentModalCtrl = ctrl;
  }
  openPremiseAccidentModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      console.log('legalCaseStore-detail', item);
      const {
        premiseAccident_clientHasObtainedPlaintiffAdvance,
        premiseAccident_advanceAmount,
        premiseAccident_lossOfEarningsIsBeingFiled,
        premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
        premiseAccident_explain,
        premiseAccident_clientHasCriminalHistory,
        premiseAccident_criminalHistory,
        premiseAccident_locationOfIncident
      } = item;
      this.currentLegalCaseItem = item;
      (_a = this.premiseAccidentModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
        premiseAccident_clientHasObtainedPlaintiffAdvance,
        premiseAccident_advanceAmount,
        premiseAccident_lossOfEarningsIsBeingFiled,
        premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
        premiseAccident_explain,
        premiseAccident_clientHasCriminalHistory,
        premiseAccident_criminalHistory,
        premiseAccident_locationOfIncident
      }, {}, this);
    }).unsubscribe();
  }
  updatePremiseAccidentModal(formData) {
    var _a, _b, _c, _d, _e, _f;
    const {
      premiseAccident_clientHasObtainedPlaintiffAdvance,
      premiseAccident_advanceAmount,
      premiseAccident_lossOfEarningsIsBeingFiled,
      premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
      premiseAccident_explain,
      premiseAccident_clientHasCriminalHistory,
      premiseAccident_criminalHistory,
      premiseAccident_locationOfIncident
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name: (_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.name,
      firmId: (_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.firmId,
      patientId: (_d = this.currentLegalCaseItem) === null || _d === void 0 ? void 0 : _d.patientId,
      premiseAccident_clientHasObtainedPlaintiffAdvance,
      premiseAccident_advanceAmount,
      premiseAccident_lossOfEarningsIsBeingFiled,
      premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
      premiseAccident_explain,
      premiseAccident_clientHasCriminalHistory,
      premiseAccident_criminalHistory,
      premiseAccident_locationOfIncident
    });
    this.legalCaseStore.loadLegalCaseEffect((_e = this.currentLegalCaseItem) === null || _e === void 0 ? void 0 : _e.id);
    (_f = this.premiseAccidentModalCtrl) === null || _f === void 0 ? void 0 : _f.close();
  }
  /* Premise Accident Edit */
  /* Product Liability Edit */
  setProductLiabilityModalCtrl(ctrl) {
    this.productLiabilityModalCtrl = ctrl;
  }
  openProductLiabilityModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      console.log('legalCaseStore-detail', item);
      const {
        productLiability_product,
        productLiability_whereDidItHappen,
        productLiability_proofOfLiability,
        productLiability_productWasRecalled
      } = item;
      this.currentLegalCaseItem = item;
      (_a = this.productLiabilityModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
        productLiability_product,
        productLiability_whereDidItHappen,
        productLiability_proofOfLiability,
        productLiability_productWasRecalled
      }, {}, this);
    }).unsubscribe();
  }
  updateProductLiabilityModal(formData) {
    var _a, _b, _c, _d, _e, _f;
    const {
      productLiability_product,
      productLiability_whereDidItHappen,
      productLiability_proofOfLiability,
      productLiability_productWasRecalled
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name: (_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.name,
      firmId: (_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.firmId,
      patientId: (_d = this.currentLegalCaseItem) === null || _d === void 0 ? void 0 : _d.patientId,
      productLiability_product,
      productLiability_whereDidItHappen,
      productLiability_proofOfLiability,
      productLiability_productWasRecalled
    });
    this.legalCaseStore.loadLegalCaseEffect((_e = this.currentLegalCaseItem) === null || _e === void 0 ? void 0 : _e.id);
    (_f = this.productLiabilityModalCtrl) === null || _f === void 0 ? void 0 : _f.close();
  }
  /* Product Liability Edit */
  /* Work Related Edit */
  setWorkRelatedModalCtrl(ctrl) {
    this.workRelatedModalCtrl = ctrl;
  }
  openWorkRelatedModal() {
    this.legalCaseStore.actionResult$.subscribe(({
      item,
      done
    }) => {
      var _a;
      console.log('legalCaseStore-detail', item);
      const {
        workRelated_selfInsuredWorkComp,
        workRelated_workCompCaseIsOpenClosed,
        workRelated_workCompCaseSettledAmount,
        workRelated_workCompCaseSettlementIncludesFutureMedicals,
        workRelated_reasonNotFiledUnderWorkComp
      } = item;
      this.currentLegalCaseItem = item;
      (_a = this.workRelatedModalCtrl) === null || _a === void 0 ? void 0 : _a.open({
        workRelated_selfInsuredWorkComp,
        workRelated_workCompCaseIsOpenClosed,
        workRelated_workCompCaseSettledAmount,
        workRelated_workCompCaseSettlementIncludesFutureMedicals,
        workRelated_reasonNotFiledUnderWorkComp
      }, {}, this);
    }).unsubscribe();
  }
  updateWorkRelatedModal(formData) {
    var _a, _b, _c, _d, _e, _f;
    const {
      workRelated_selfInsuredWorkComp,
      workRelated_workCompCaseIsOpenClosed,
      workRelated_workCompCaseSettledAmount,
      workRelated_workCompCaseSettlementIncludesFutureMedicals,
      workRelated_reasonNotFiledUnderWorkComp
    } = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id: (_a = this.currentLegalCaseItem) === null || _a === void 0 ? void 0 : _a.id,
      name: (_b = this.currentLegalCaseItem) === null || _b === void 0 ? void 0 : _b.name,
      firmId: (_c = this.currentLegalCaseItem) === null || _c === void 0 ? void 0 : _c.firmId,
      patientId: (_d = this.currentLegalCaseItem) === null || _d === void 0 ? void 0 : _d.patientId,
      workRelated_selfInsuredWorkComp,
      workRelated_workCompCaseIsOpenClosed,
      workRelated_workCompCaseSettledAmount,
      workRelated_workCompCaseSettlementIncludesFutureMedicals,
      workRelated_reasonNotFiledUnderWorkComp
    });
    this.legalCaseStore.loadLegalCaseEffect((_e = this.currentLegalCaseItem) === null || _e === void 0 ? void 0 : _e.id);
    (_f = this.workRelatedModalCtrl) === null || _f === void 0 ? void 0 : _f.close();
  }
  /* Work Related Edit */
  /* Functioinal Neurological Symptoms Edit */
  setFunctionalNeurologicalSymptomsModalCtrl(ctrl) {
    this.functionalNeurologicalSymptomsCtrl = ctrl;
  }
  openFunctionalNeurologicalSymptomsModal() {
    var _a;
    (_a = this.functionalNeurologicalSymptomsCtrl) === null || _a === void 0 ? void 0 : _a.open({}, {}, this);
  }
  /* Functioinal Neurological Symptoms Edit */
  /* Audiologial Symptoms Edit */
  setAudiologicalSymptomsModalCtrl(ctrl) {
    this.audiologicalSymptomsCtrl = ctrl;
  }
  openAudiologicalSymptomsModal() {
    var _a;
    (_a = this.audiologicalSymptomsCtrl) === null || _a === void 0 ? void 0 : _a.open({}, {}, this);
  }
  /* Audiologial Symptoms Edit */
  /* Bodily Injury Symptoms Edit */
  setBodilyInjurySymptomsModalCtrl(ctrl) {
    this.bodilyInjurySymptomsCtrl = ctrl;
  }
  openBodilyInjurySymptomsModal() {
    var _a;
    (_a = this.bodilyInjurySymptomsCtrl) === null || _a === void 0 ? void 0 : _a.open({}, {}, this);
  }
}
OverviewStore.ɵfac = function OverviewStore_Factory(t) {
  return new (t || OverviewStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_8__.WebPatientFeatureStore));
};
OverviewStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: OverviewStore,
  factory: OverviewStore.ɵfac
});

/***/ }),

/***/ 518559:
/*!**************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/overview/overview.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseOverviewComponent": () => (/* binding */ WebLegalCaseOverviewComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _overview_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overview.component.store */ 594679);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);







function WebLegalCaseOverviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-formly-json-form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("componentStore", ctx_r0.store)("formData", ctx_r0.formData)("model", vm_r1.item);
  }
}
class WebLegalCaseOverviewComponent {
  constructor(store) {
    this.store = store;
    this.vm$ = this.store.vm$;
    this.formData = {};
    this.subscriber = this.store.item$.subscribe(item => {
      this.formData = item;
      console.log("formData-overview", this.formData);
    });
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteLegalCase();
    }
  }
  appointmentAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  caseAccountAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  casePreAccidentAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  casePreInjuryAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  casePreProblemAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  casePreProcedureAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  caseProcedureAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  insuranceAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
  priorMedsToDateAdded($event) {
    console.log('from the overview in Legal Case, added: ', $event);
  }
}
WebLegalCaseOverviewComponent.ɵfac = function WebLegalCaseOverviewComponent_Factory(t) {
  return new (t || WebLegalCaseOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_overview_component_store__WEBPACK_IMPORTED_MODULE_1__.OverviewStore));
};
WebLegalCaseOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLegalCaseOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_2__.WebLegalCaseFeatureStore, _overview_component_store__WEBPACK_IMPORTED_MODULE_1__.OverviewStore, _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_3__.WebPatientFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "legalCase_overview_test_2", 1, "flex-1", 3, "showSubmitButton", "componentStore", "formData", "model"]],
  template: function WebLegalCaseOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebLegalCaseOverviewComponent_ng_container_0_Template, 2, 4, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 376506:
/*!******************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/web-legal-case-detail.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseDetailComponent": () => (/* binding */ WebLegalCaseDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_legal_case_detail_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-legal-case-detail.store */ 600699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_breadcrumbs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/breadcrumbs */ 890347);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/components/navigation/vertical/vertical.component */ 156739);
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 836895);


















const _c0 = ["matDrawer"];
function WebLegalCaseDetailComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebLegalCaseDetailComponent_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.toggle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:chevron-double-left");
  }
}
function WebLegalCaseDetailComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebLegalCaseDetailComponent_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.toggle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:chevron-double-right");
  }
}
class WebLegalCaseDetailComponent {
  constructor(store, route, _changeDetectorRef, router, breadcrumbService, _fuseMediaWatcherService) {
    this.store = store;
    this.route = route;
    this._changeDetectorRef = _changeDetectorRef;
    this.router = router;
    this.breadcrumbService = breadcrumbService;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.menuData = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.vm$ = this.store.vm$;
    // Get Legal Case Id
    this.legalCaseId = this.route.snapshot.paramMap.get('legalCaseId');
    // Get Legal Case Name From Resolver
    this.route.data.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(data => {
      this.legalCaseName = data.legalCaseName;
    });
    // Update Breadcrumbs for current url
    this.updateBreadCrumbs(this.router.url);
    // Detect Router Change and Update Breadcrumbs accordingly
    this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(event => {
      if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd) {
        this.updateBreadCrumbs(event.url);
      }
    });
  }
  updateBreadCrumbs(url) {
    const urlSplits = url === null || url === void 0 ? void 0 : url.split('/');
    const indexOfDetails = urlSplits.indexOf('details');
    const relativeUrl = (urlSplits === null || urlSplits === void 0 ? void 0 : urlSplits.length) > 0 ? urlSplits[indexOfDetails + 1] : undefined;
    let breadcrumbs = [{
      name: 'Legal Cases',
      path: '/queues/legal-cases'
    }, {
      name: this.legalCaseName,
      path: `/queues/legal-cases/${this.legalCaseId}/details/overview`
    }];
    switch (relativeUrl) {
      case 'overview':
        break;
      case 'appointments':
        breadcrumbs.push({
          name: 'Appointments',
          path: `queues/legal-cases/${this.legalCaseId}/details/appointments`
        });
        break;
      case 'case-accounts':
        breadcrumbs.push({
          name: 'Case Accounts',
          path: `queues/legal-cases/${this.legalCaseId}/details/case-accounts`
        });
        break;
      case 'case-procedures':
        breadcrumbs.push({
          name: 'Case Procedures',
          path: `queues/legal-cases/${this.legalCaseId}/details/case-procedures`
        });
        break;
      case 'insurances':
        breadcrumbs.push({
          name: 'Insurances',
          path: `queues/legal-cases/${this.legalCaseId}/details/insurances`
        });
        break;
      case 'invoices':
        breadcrumbs.push({
          name: 'Invoices',
          path: `queues/legal-cases/${this.legalCaseId}/details/invoices`
        });
        break;
      case 'prior-meds-to-dates':
        breadcrumbs.push({
          name: 'Prior Meds To Dates',
          path: 'queues/legal-cases/:id/details/prior-meds-to-dates'
        });
        break;
      case 'negotiations':
        breadcrumbs.push({
          name: 'Negotiations',
          path: 'queues/legal-cases/:id/details/negotiations'
        });
      case 'mailbox':
        breadcrumbs.push({
          name: 'Mailbox',
          path: 'queues/legal-cases/:id/details/mailbox'
        });
        break;
      default:
        break;
    }
    this.breadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  ngAfterViewInit() {
    var routeString = this.route.snapshot.pathFromRoot.map(r => r.url).join('/').replace('//', '/');
    this.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(s => {
      var _a;
      if (((_a = s === null || s === void 0 ? void 0 : s.item) === null || _a === void 0 ? void 0 : _a.id) != undefined) {
        this.menuData = [{
          id: 'Details',
          title: 'Legal Case Details',
          type: 'group',
          children: [{
            id: 'details.overview',
            title: 'Overview',
            type: 'basic',
            link: `${routeString}/overview`
          }, {
            id: 'details.appointment',
            title: 'Appointments',
            type: 'basic',
            link: `${routeString}/appointments`
          }, {
            id: 'details.caseAccount',
            title: 'Case Accounts',
            type: 'basic',
            link: `${routeString}/case-accounts`
          },
          // {
          //                   id: 'details.casePreAccident',
          //                   title: 'Case Pre Accidents',
          //                   type: 'basic',
          //                   link: `${routeString}/case-pre-accidents`,
          //                 },
          // {
          //                   id: 'details.casePreInjury',
          //                   title: 'Case Pre Injuries',
          //                   type: 'basic',
          //                   link: `${routeString}/case-pre-injuries`,
          //                 },
          // {
          //                   id: 'details.casePreProblem',
          //                   title: 'Case Pre Problems',
          //                   type: 'basic',
          //                   link: `${routeString}/case-pre-problems`,
          //                 },
          // {
          //                   id: 'details.casePreProcedure',
          //                   title: 'Case Pre Procedures',
          //                   type: 'basic',
          //                   link: `${routeString}/case-pre-procedures`,
          //                 },
          {
            id: 'details.caseProcedure',
            title: 'Case Procedures',
            type: 'basic',
            link: `${routeString}/case-procedures`
          }, {
            id: 'details.insurance',
            title: 'Insurances',
            type: 'basic',
            link: `${routeString}/insurances`
          }, {
            id: 'details.invoice',
            title: 'Invoices',
            type: 'basic',
            link: `${routeString}/invoices`
          }, {
            id: 'details.priorMedsToDate',
            title: 'Prior Meds to Dates',
            type: 'basic',
            link: `${routeString}/prior-meds-to-dates`
          }, {
            id: 'details.Negotiations',
            title: 'Negotiations',
            type: 'basic',
            link: `${routeString}/negotiations`
          }, {
            id: 'details.Mailbox',
            title: 'Mailbox',
            type: 'basic',
            link: `${routeString}/mailbox`
          }]
        }];
      }
    })).subscribe();
  }
  ngOnInit() {
    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('md')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteLegalCaseEffect(item);
    }
  }
}
WebLegalCaseDetailComponent.ɵfac = function WebLegalCaseDetailComponent_Factory(t) {
  return new (t || WebLegalCaseDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_legal_case_detail_store__WEBPACK_IMPORTED_MODULE_5__.WebLegalCaseDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_breadcrumbs__WEBPACK_IMPORTED_MODULE_6__.Ng7DynamicBreadcrumbService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_7__.FuseMediaWatcherService));
};
WebLegalCaseDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLegalCaseDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebLegalCaseDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_legal_case_detail_store__WEBPACK_IMPORTED_MODULE_5__.WebLegalCaseDetailStore])],
  decls: 10,
  vars: 10,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["class", "ml-4 absolute left-4 top-0 sm:left-1", "style", "z-index: 201;", "mat-icon-button", "", 3, "click", 4, "ngIf"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"], ["mat-icon-button", "", 1, "ml-4", "absolute", "left-4", "top-0", "sm:left-1", 2, "z-index", "201", 3, "click"], [3, "svgIcon"]],
  template: function WebLegalCaseDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebLegalCaseDetailComponent_button_5_Template, 2, 1, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-drawer-content", 6)(7, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WebLegalCaseDetailComponent_button_9_Template, 2, 1, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("navigation", ctx.menuData)("inner", true)("mode", "side")("name", "docs-guides-navigation")("opened", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_r0.opened);
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__.MatDrawerContent, _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_11__.FuseVerticalNavigationComponent, _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_12__.FuseScrollResetDirective, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 547423:
/*!***************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/web-legal-case-detail.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseDetailModule": () => (/* binding */ WebLegalCaseDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tree */ 135423);
/* harmony import */ var _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/highlight */ 205029);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/components/navigation */ 352221);
/* harmony import */ var _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/directives/scroll-reset */ 634697);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _web_legal_case_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-legal-case-detail.component */ 376506);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./overview/overview.component */ 518559);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _negotiations_negotiations_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./negotiations/negotiations.component */ 424469);
/* harmony import */ var _web_legal_case_detail_resolver__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./web-legal-case-detail.resolver */ 274240);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


























class WebLegalCaseDetailModule {}
WebLegalCaseDetailModule.ɵfac = function WebLegalCaseDetailModule_Factory(t) {
  return new (t || WebLegalCaseDetailModule)();
};
WebLegalCaseDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebLegalCaseDetailModule
});
WebLegalCaseDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_legal_case_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebLegalCaseDetailComponent,
    resolve: {
      legalCaseName: _web_legal_case_detail_resolver__WEBPACK_IMPORTED_MODULE_21__.WebLegalCaseDetailResolver
    },
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_22__.WebLegalCaseOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_legal-case_feature_src_lib_web-legal-case-edit_web-legal-case-edit_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../web-legal-case-edit/web-legal-case-edit.module */ 323482)).then(m => m.WebLegalCaseEditModule)
    }, {
      path: 'appointments',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/appointment/feature */ 715425)).then(m => m.WebAppointmentFeatureModule)
    }, {
      path: 'case-accounts',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-account/feature */ 692358)).then(m => m.WebCaseAccountFeatureModule)
    }, {
      path: 'case-pre-accidents',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-pre-accident/feature */ 684339)).then(m => m.WebCasePreAccidentFeatureModule)
    }, {
      path: 'case-pre-injuries',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-pre-injury/feature */ 438572)).then(m => m.WebCasePreInjuryFeatureModule)
    }, {
      path: 'case-pre-problems',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-pre-problem/feature */ 479880)).then(m => m.WebCasePreProblemFeatureModule)
    }, {
      path: 'case-pre-procedures',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-pre-procedure/feature */ 121066)).then(m => m.WebCasePreProcedureFeatureModule)
    }, {
      path: 'case-procedures',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-procedure/feature */ 311708)).then(m => m.WebCaseProcedureFeatureModule)
    }, {
      path: 'invoices',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/invoice/feature */ 187767)).then(m => m.WebInvoiceFeatureModule)
    }, {
      path: 'insurances',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/insurance/feature */ 598065)).then(m => m.WebInsuranceFeatureModule)
    }, {
      path: 'prior-meds-to-dates',
      data: {
        title: 'Detail'
      },
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/prior-meds-to-date/feature */ 458642)).then(m => m.WebPriorMedsToDateFeatureModule)
    }, {
      path: 'negotiations',
      data: {
        title: 'Negotiations'
      },
      component: _negotiations_negotiations_component__WEBPACK_IMPORTED_MODULE_23__.WebLegalCaseNegotiationsComponent
    }, {
      path: 'mailbox',
      data: {
        title: 'Mailbox'
      },
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_fuse_pipes_find-by-key_find-by-key_module_ts-node_modules_lodash-es_isEqual_js"), __webpack_require__.e("default-libs_web_mailbox_feature_src_index_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/mailbox/feature */ 291997)).then(m => m.MailboxModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_24__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_25__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebLegalCaseDetailModule, {
    declarations: [_web_legal_case_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebLegalCaseDetailComponent, _negotiations_negotiations_component__WEBPACK_IMPORTED_MODULE_23__.WebLegalCaseNegotiationsComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_22__.WebLegalCaseOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_24__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_25__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 274240:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/legal-case/feature/src/lib/web-legal-case-detail/web-legal-case-detail.resolver.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseDetailResolver": () => (/* binding */ WebLegalCaseDetailResolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);





class WebLegalCaseDetailResolver {
  constructor(data) {
    this.data = data;
  }
  resolve(route, state) {
    console.log('web legal case detail resolver');
    const legalCaseId = route.paramMap.get('legalCaseId');
    return this.data.userLegalCase({
      legalCaseId
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.map)(res => {
      var _a;
      if ((_a = res.data) === null || _a === void 0 ? void 0 : _a.item) return res.data.item.name;else return undefined;
    }));
  }
}
WebLegalCaseDetailResolver.ɵfac = function WebLegalCaseDetailResolver_Factory(t) {
  return new (t || WebLegalCaseDetailResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__.WebCoreDataAccessService));
};
WebLegalCaseDetailResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: WebLegalCaseDetailResolver,
  factory: WebLegalCaseDetailResolver.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);