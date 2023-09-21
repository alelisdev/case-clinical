"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_claim_ui_web-claim-select-form_web-claim-select-table-view_component_ts"],{

/***/ 175233:
/*!******************************************************************************************!*\
  !*** ./libs/web/claim/ui/web-claim-select-form/web-claim-select-table-view.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClaimSelectTableViewComponent": () => (/* binding */ WebClaimSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebClaimSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.claims = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claim.name',
      headerName: 'Claim',
      filter: 'agTextColumnFilter'
    }, {
      field: 'explanationOfPayment.name',
      headerName: 'Explanation of Payment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patient.name',
      headerName: 'Patient',
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
      field: 'originalRecordDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'receivedDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dueDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'patientName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientPhoneNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientDob',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientAddressLine1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientAddressCity',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientAddressState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientAddressPostalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'carrierName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'carrierLine1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'carrierLine2',
      filter: 'agTextColumnFilter'
    }, {
      field: 'carrierCity',
      filter: 'agTextColumnFilter'
    }, {
      field: 'carrierState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'carrierPostalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuredName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuredLine1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuredCity',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuredState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuredPostalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientSignature',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode2',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode3',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode4',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode5',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode6',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode7',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisCode8',
      filter: 'agTextColumnFilter'
    }, {
      field: 'federalTaxId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'totalCharges',
      filter: 'agTextColumnFilter'
    }, {
      field: 'amountPaid',
      filter: 'agTextColumnFilter'
    }, {
      field: 'physicianSignature',
      filter: 'agTextColumnFilter'
    }, {
      field: 'physicianSignedOn',
      filter: 'agTextColumnFilter'
    }, {
      field: 'serviceFacility',
      filter: 'agTextColumnFilter'
    }, {
      field: 'serviceFacilityLine1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'serviceFacilityCity',
      filter: 'agTextColumnFilter'
    }, {
      field: 'serviceFacilityState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'serviceFacilityPostalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'serviceFacilityNpi',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingFacility',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingLine1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingCity',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingState',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingPostalCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingNpi',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingPhoneNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'billingOther',
      filter: 'agTextColumnFilter'
    }, {
      field: 'sessionNotes',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referringProvider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referringProviderNpi',
      filter: 'agTextColumnFilter'
    }, {
      field: 'additionalClaimInfo',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accountNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'referenceNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'facility',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationRequestId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'providerName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'providerNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendor',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendorLine1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendorCSZ',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendorTaxId',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Total Approved Amount',
      field: 'totalApprovedAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.totalApprovedAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Total Billed Amount',
      field: 'totalBilledAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.totalBilledAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Total Net Pay Amount',
      field: 'totalNetPayAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.totalNetPayAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'notes',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claimId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'explanationOfPaymentId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'patientId',
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
WebClaimSelectTableViewComponent.ɵfac = function WebClaimSelectTableViewComponent_Factory(t) {
  return new (t || WebClaimSelectTableViewComponent)();
};
WebClaimSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClaimSelectTableViewComponent,
  selectors: [["ui-claim-select-table-view"]],
  viewQuery: function WebClaimSelectTableViewComponent_Query(rf, ctx) {
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
    claims: "claims"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebClaimSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebClaimSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebClaimSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.claims)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);