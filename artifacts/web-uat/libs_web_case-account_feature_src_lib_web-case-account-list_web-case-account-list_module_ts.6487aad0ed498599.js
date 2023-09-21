"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_case-account_feature_src_lib_web-case-account-list_web-case-account-list_module_ts"],{

/***/ 430336:
/*!********************************************************************************************************!*\
  !*** ./libs/web/case-account/feature/src/lib/web-case-account-list/web-case-account-list.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountListComponent": () => (/* binding */ WebCaseAccountListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 469751);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_case_account_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/case-account/shared */ 42897);
/* harmony import */ var _case_clinical_web_case_account_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/case-account/ui */ 261637);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/location/shared */ 774121);
/* harmony import */ var _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/vendor/shared */ 92079);
/* harmony import */ var _case_clinical_web_account_status_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/account-status/shared */ 811325);
/* harmony import */ var _case_clinical_web_procedure_type_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/procedure-type/shared */ 76919);
/* harmony import */ var _case_clinical_web_agreement_type_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/agreement-type/shared */ 924093);
/* harmony import */ var _case_clinical_web_claim_procedure_shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/claim-procedure/shared */ 753903);
/* harmony import */ var _case_clinical_web_invoice_detail_shared__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/invoice-detail/shared */ 450905);
/* harmony import */ var _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/contract/shared */ 895333);
/* harmony import */ var _case_clinical_web_portfolio_shared__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/portfolio/shared */ 67913);
/* harmony import */ var _case_clinical_web_procedure_vendor_shared__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @case-clinical/web/procedure-vendor/shared */ 232634);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/core/feature */ 489054);
/* harmony import */ var _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../datatable/feature/src/lib/data-list/table-list.component */ 707215);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);
































function WebCaseAccountListComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ui-data-list", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchQueryDidChange", function WebCaseAccountListComponent_ng_container_0_ng_container_1_Template_ui_data_list_searchQueryDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.searchQueryDidChange($event));
    })("excelDataHasBeenPopulated", function WebCaseAccountListComponent_ng_container_0_ng_container_1_Template_ui_data_list_excelDataHasBeenPopulated_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.excelDataHasBeenPopulated($event));
    })("selectionDidChange", function WebCaseAccountListComponent_ng_container_0_ng_container_1_Template_ui_data_list_selectionDidChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.selectionDidChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r4 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r4.caseAccounts)("columnDefs", ctx_r3.columnDefs)("validateFunc", ctx_r3.validateImportData)("createNewFunc", ctx_r3.createNewFunc)("checkBoxSelection", true)("actionTemplateForCheckBox", _r1);
  }
}
function WebCaseAccountListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebCaseAccountListComponent_ng_container_0_ng_container_1_Template, 2, 6, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.vm$));
  }
}
function WebCaseAccountListComponent_ng_template_1_ui_formly_json_form_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-json-form", 5);
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "caseAccount_invoiceCreate")("showSubmitButton", false)("formData", ctx_r9.formData);
  }
}
function WebCaseAccountListComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebCaseAccountListComponent_ng_template_1_ui_formly_json_form_0_Template, 1, 3, "ui-formly-json-form", 4);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r2.formData == null ? null : ctx_r2.formData.selectedItems.length) > 0);
  }
}
class WebCaseAccountListComponent {
  constructor(store, legalCaseFeatureStore, locationFeatureStore, vendorFeatureStore, accountStatusFeatureStore, procedureTypeFeatureStore, agreementTypeFeatureStore, claimProcedureFeatureStore, invoiceDetailFeatureStore, contractFeatureStore, portfolioFeatureStore, procedureVendorFeatureStore) {
    this.store = store;
    this.legalCaseFeatureStore = legalCaseFeatureStore;
    this.locationFeatureStore = locationFeatureStore;
    this.vendorFeatureStore = vendorFeatureStore;
    this.accountStatusFeatureStore = accountStatusFeatureStore;
    this.procedureTypeFeatureStore = procedureTypeFeatureStore;
    this.agreementTypeFeatureStore = agreementTypeFeatureStore;
    this.claimProcedureFeatureStore = claimProcedureFeatureStore;
    this.invoiceDetailFeatureStore = invoiceDetailFeatureStore;
    this.contractFeatureStore = contractFeatureStore;
    this.portfolioFeatureStore = portfolioFeatureStore;
    this.procedureVendorFeatureStore = procedureVendorFeatureStore;
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'location.name',
      headerName: 'Location',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendor.name',
      headerName: 'Vendor',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accountStatus.name',
      headerName: 'Account Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureType.name',
      headerName: 'Procedure Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'agreementType.name',
      headerName: 'Agreement Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claimProcedure.name',
      headerName: 'Claim Procedure',
      filter: 'agTextColumnFilter'
    }, {
      field: 'invoiceDetail.name',
      headerName: 'Invoice Detail',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contract.name',
      headerName: 'Contract',
      filter: 'agTextColumnFilter'
    }, {
      field: 'portfolio.name',
      headerName: 'Portfolio',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureVendor.name',
      headerName: 'Procedure Vendor',
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
      field: 'locationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'vendorId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'accountStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'procedureTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'agreementTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'accountAgentId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claimProcedureId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'invoiceDetailId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'portfolioId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'thirdPartyFunderName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'originalDueDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Account Term',
      field: 'accountTerm',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.accountTerm, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'serviceDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.quantity, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Original Debt',
      field: 'originalDebt',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.originalDebt, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
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
      headerName: 'Balance',
      field: 'balance',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.balance, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Last Balance',
      field: 'lastBalance',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.lastBalance, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Reduction',
      field: 'reduction',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.reduction, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'treatmentState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accountNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'servicesPerformed',
      filter: 'agTextColumnFilter'
    }, {
      field: 'cptCodes',
      filter: 'agTextColumnFilter'
    }, {
      field: 'treatingPhysician',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referringPhysician',
      filter: 'agTextColumnFilter'
    }, {
      field: 'collectionsDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'deemedWriteOffDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'expensedBadDebtDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'paidDate',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Ghost Account',
      field: 'ghostAccount',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'ghostedDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'ghostedBy',
      filter: 'agTextColumnFilter'
    }, {
      field: 'unGhostedDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'unGhostedBy',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Additional Payment',
      field: 'additionalPayment',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Missing Bill',
      field: 'missingBill',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Missing Lien',
      field: 'missingLien',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      headerName: 'Missing Medical Records',
      field: 'missingMedicalRecords',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'assignedTo',
      filter: 'agTextColumnFilter'
    }, {
      field: 'resubmitted',
      filter: 'agDateColumnFilter'
    }, {
      field: 'treatmentCity',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Origination',
      field: 'origination',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.origination, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Threshold Provider Rate',
      field: 'thresholdProviderRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.thresholdProviderRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Threshold Location Rate',
      field: 'thresholdLocationRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.thresholdLocationRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'teamLeaderRateSource',
      filter: 'agTextColumnFilter'
    }, {
      field: 'checkNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accountDateReceived',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dateApplied',
      filter: 'agDateColumnFilter'
    }, {
      headerName: 'Amount Applied',
      field: 'amountApplied',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.amountApplied, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'description',
      filter: 'agTextColumnFilter'
    }, {
      field: 'note',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Medicare Rate',
      field: 'medicareRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.medicareRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Provider Percent of Medicare',
      field: 'providerPercentOfMedicare',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.providerPercentOfMedicare, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Contracted Amount',
      field: 'contractedAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.contractedAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Markup Percent',
      field: 'markupPercent',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.markupPercent, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Reimbursed Total',
      field: 'reimbursedTotal',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.reimbursedTotal, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Initial Revenue',
      field: 'initialRevenue',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.initialRevenue, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Factor',
      field: 'factor',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.factor, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Retail Bill',
      field: 'retailBill',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.retailBill, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Est Margin',
      field: 'estMargin',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estMargin, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Roi',
      field: 'roi',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.roi, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Attorney Paid',
      field: 'attorneyPaid',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.attorneyPaid, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Percent of Retail',
      field: 'percentOfRetail',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.percentOfRetail, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Reimbursed From PCR',
      field: 'reimbursedFromPCR',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.reimbursedFromPCR, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Ingredient Cost',
      field: 'ingredientCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.ingredientCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Dispensing Cost',
      field: 'dispensingCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.dispensingCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Administrative Cost',
      field: 'administrativeCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.administrativeCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Co Pay',
      field: 'coPay',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.coPay, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Total Cost',
      field: 'totalCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.totalCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Average Wholesale Price',
      field: 'averageWholesalePrice',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.averageWholesalePrice, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Weighted Average Cost',
      field: 'weightedAverageCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.weightedAverageCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Average Sale Price',
      field: 'averageSalePrice',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.averageSalePrice, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Invoice Cost',
      field: 'invoiceCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.invoiceCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Usual and Customary',
      field: 'usualAndCustomary',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.usualAndCustomary, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'nationalDrugCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureVendorId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
    this.formData = {
      selectedItems: []
    };
    this.validateImportData = this.validateImportData.bind(this);
    this.createNewFunc = this.createNewFunc.bind(this);
  }
  ngOnInit() {
    this.store.loadCaseAccountsEffect();
    this.store.filterLegalCases('').subscribe();
    this.store.filterLocations('').subscribe();
    this.store.filterVendors('').subscribe();
    this.store.filterAccountStatuses('').subscribe();
    this.store.filterProcedureTypes('').subscribe();
    this.store.filterAgreementTypes('').subscribe();
    this.store.filterClaimProcedures('').subscribe();
    this.store.filterInvoiceDetails('').subscribe();
    this.store.filterContracts('').subscribe();
    this.store.filterPortfolios('').subscribe();
    this.store.filterProcedureVendors('').subscribe();
  }
  createNewFunc(type, newName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
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
        case 'accountStatus':
          {
            const accountStatusCreateActionResultListener = this.accountStatusFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAccountStatus(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                accountStatusCreateActionResultListener.unsubscribe();
              }
            });
            this.accountStatusFeatureStore.createAccountStatusEffect({
              name: newName
            });
            break;
          }
        case 'procedureType':
          {
            const procedureTypeCreateActionResultListener = this.procedureTypeFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addProcedureType(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                procedureTypeCreateActionResultListener.unsubscribe();
              }
            });
            this.procedureTypeFeatureStore.createProcedureTypeEffect({
              name: newName
            });
            break;
          }
        case 'agreementType':
          {
            const agreementTypeCreateActionResultListener = this.agreementTypeFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addAgreementType(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                agreementTypeCreateActionResultListener.unsubscribe();
              }
            });
            this.agreementTypeFeatureStore.createAgreementTypeEffect({
              name: newName
            });
            break;
          }
        case 'claimProcedure':
          {
            const claimProcedureCreateActionResultListener = this.claimProcedureFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addClaimProcedure(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                claimProcedureCreateActionResultListener.unsubscribe();
              }
            });
            this.claimProcedureFeatureStore.createClaimProcedureEffect({
              name: newName
            });
            break;
          }
        case 'invoiceDetail':
          {
            const invoiceDetailCreateActionResultListener = this.invoiceDetailFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addInvoiceDetail(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                invoiceDetailCreateActionResultListener.unsubscribe();
              }
            });
            this.invoiceDetailFeatureStore.createInvoiceDetailEffect({
              name: newName
            });
            break;
          }
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
        case 'portfolio':
          {
            const portfolioCreateActionResultListener = this.portfolioFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addPortfolio(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                portfolioCreateActionResultListener.unsubscribe();
              }
            });
            this.portfolioFeatureStore.createPortfolioEffect({
              name: newName
            });
            break;
          }
        case 'procedureVendor':
          {
            const procedureVendorCreateActionResultListener = this.procedureVendorFeatureStore.actionResult$.subscribe(result => {
              if (result.done) {
                this.store.addProcedureVendor(result.item);
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300);
                procedureVendorCreateActionResultListener.unsubscribe();
              }
            });
            this.procedureVendorFeatureStore.createProcedureVendorEffect({
              name: newName
            });
            break;
          }
        default:
          observer.next(false);
      }
    });
  }
  selectionDidChange($event) {
    console.log('----------');
    console.log($event);
    this.formData = {
      selectedItems: $event
    };
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
    this.store.loadCaseAccountsEffect();
  }
}
WebCaseAccountListComponent.ɵfac = function WebCaseAccountListComponent_Factory(t) {
  return new (t || WebCaseAccountListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_account_shared__WEBPACK_IMPORTED_MODULE_3__.WebCaseAccountFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_4__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__.WebLocationFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_6__.WebVendorFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_account_status_shared__WEBPACK_IMPORTED_MODULE_7__.WebAccountStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_type_shared__WEBPACK_IMPORTED_MODULE_8__.WebProcedureTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_agreement_type_shared__WEBPACK_IMPORTED_MODULE_9__.WebAgreementTypeFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_claim_procedure_shared__WEBPACK_IMPORTED_MODULE_10__.WebClaimProcedureFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_invoice_detail_shared__WEBPACK_IMPORTED_MODULE_11__.WebInvoiceDetailFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_12__.WebContractFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_portfolio_shared__WEBPACK_IMPORTED_MODULE_13__.WebPortfolioFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_vendor_shared__WEBPACK_IMPORTED_MODULE_14__.WebProcedureVendorFeatureStore));
};
WebCaseAccountListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCaseAccountListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebCaseAccountListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_case_account_ui__WEBPACK_IMPORTED_MODULE_15__.WebCaseAccountSelectTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_case_account_shared__WEBPACK_IMPORTED_MODULE_3__.WebCaseAccountFeatureStore, _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_4__.WebLegalCaseFeatureStore, _case_clinical_web_location_shared__WEBPACK_IMPORTED_MODULE_5__.WebLocationFeatureStore, _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_6__.WebVendorFeatureStore, _case_clinical_web_account_status_shared__WEBPACK_IMPORTED_MODULE_7__.WebAccountStatusFeatureStore, _case_clinical_web_procedure_type_shared__WEBPACK_IMPORTED_MODULE_8__.WebProcedureTypeFeatureStore, _case_clinical_web_agreement_type_shared__WEBPACK_IMPORTED_MODULE_9__.WebAgreementTypeFeatureStore, _case_clinical_web_claim_procedure_shared__WEBPACK_IMPORTED_MODULE_10__.WebClaimProcedureFeatureStore, _case_clinical_web_invoice_detail_shared__WEBPACK_IMPORTED_MODULE_11__.WebInvoiceDetailFeatureStore, _case_clinical_web_contract_shared__WEBPACK_IMPORTED_MODULE_12__.WebContractFeatureStore, _case_clinical_web_portfolio_shared__WEBPACK_IMPORTED_MODULE_13__.WebPortfolioFeatureStore, _case_clinical_web_procedure_vendor_shared__WEBPACK_IMPORTED_MODULE_14__.WebProcedureVendorFeatureStore])],
  decls: 3,
  vars: 1,
  consts: [[4, "featureFlag"], ["actionTemplateForCheckBox", ""], [4, "ngIf"], ["tableName", "caseAccount", "title", "CaseAccount", 1, "h-full", "w-full", 3, "data", "columnDefs", "validateFunc", "createNewFunc", "checkBoxSelection", "actionTemplateForCheckBox", "searchQueryDidChange", "excelDataHasBeenPopulated", "selectionDidChange"], [3, "formName", "showSubmitButton", "formData", 4, "ngIf"], [3, "formName", "showSubmitButton", "formData"]],
  template: function WebCaseAccountListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebCaseAccountListComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebCaseAccountListComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("featureFlag", "CaseAccount.View");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _case_clinical_core_feature__WEBPACK_IMPORTED_MODULE_17__.FeatureFlagDirective, _datatable_feature_src_lib_data_list_table_list_component__WEBPACK_IMPORTED_MODULE_18__.WebDataListComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_19__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 19499:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/case-account/feature/src/lib/web-case-account-list/web-case-account-list.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountListModule": () => (/* binding */ WebCaseAccountListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _web_case_account_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-case-account-list.component */ 430336);
/* harmony import */ var _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/datatable/feature */ 12677);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);










class WebCaseAccountListModule {}
WebCaseAccountListModule.ɵfac = function WebCaseAccountListModule_Factory(t) {
  return new (t || WebCaseAccountListModule)();
};
WebCaseAccountListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebCaseAccountListModule
});
WebCaseAccountListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    component: _web_case_account_list_component__WEBPACK_IMPORTED_MODULE_3__.WebCaseAccountListComponent
  }]), _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebCaseAccountListModule, {
    declarations: [_web_case_account_list_component__WEBPACK_IMPORTED_MODULE_3__.WebCaseAccountListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_4__.UtilitySharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_5__.WebCoreFeatureModule, _case_clinical_web_datatable_feature__WEBPACK_IMPORTED_MODULE_6__.WebDatatableFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule]
  });
})();

/***/ })

}]);