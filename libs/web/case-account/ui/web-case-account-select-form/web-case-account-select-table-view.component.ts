
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, CaseAccount } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-case-account-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="caseAccounts"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebCaseAccountSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() caseAccounts: CaseAccount[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'location.name', headerName: 'Location', filter: 'agTextColumnFilter' },
{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'accountStatus.name', headerName: 'Account Status', filter: 'agTextColumnFilter' },
{ field: 'procedureType.name', headerName: 'Procedure Type', filter: 'agTextColumnFilter' },
{ field: 'agreementType.name', headerName: 'Agreement Type', filter: 'agTextColumnFilter' },
{ field: 'claimProcedure.name', headerName: 'Claim Procedure', filter: 'agTextColumnFilter' },
{ field: 'invoiceDetail.name', headerName: 'Invoice Detail', filter: 'agTextColumnFilter' },
{ field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'portfolio.name', headerName: 'Portfolio', filter: 'agTextColumnFilter' },
{ field: 'procedureVendor.name', headerName: 'Procedure Vendor', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'locationId', filter: 'agTextColumnFilter', hide:true },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'accountStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'procedureTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'agreementTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'accountAgentId', filter: 'agTextColumnFilter'  },
{ field: 'claimProcedureId', filter: 'agTextColumnFilter', hide:true },
{ field: 'invoiceDetailId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true },
{ field: 'portfolioId', filter: 'agTextColumnFilter', hide:true },
{ field: 'thirdPartyFunderName', filter: 'agTextColumnFilter'  },
{ field: 'originalDueDate', filter: 'agDateColumnFilter'  },

{
      headerName: 'Account Term',
      field: 'accountTerm',
      valueFormatter: params => currencyFormatter(params.data?.accountTerm, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'serviceDate', filter: 'agDateColumnFilter'  },

{
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => currencyFormatter(params.data?.quantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Original Debt',
      field: 'originalDebt',
      valueFormatter: params => currencyFormatter(params.data?.originalDebt, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Cost',
      field: 'cost',
      valueFormatter: params => currencyFormatter(params.data?.cost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Balance',
      field: 'balance',
      valueFormatter: params => currencyFormatter(params.data?.balance, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Last Balance',
      field: 'lastBalance',
      valueFormatter: params => currencyFormatter(params.data?.lastBalance, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Reduction',
      field: 'reduction',
      valueFormatter: params => currencyFormatter(params.data?.reduction, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'treatmentState', filter: 'agTextColumnFilter'  },
{ field: 'accountNumber', filter: 'agTextColumnFilter'  },
{ field: 'servicesPerformed', filter: 'agTextColumnFilter'  },
{ field: 'cptCodes', filter: 'agTextColumnFilter'  },
{ field: 'treatingPhysician', filter: 'agTextColumnFilter'  },
{ field: 'referringPhysician', filter: 'agTextColumnFilter'  },
{ field: 'collectionsDate', filter: 'agDateColumnFilter'  },
{ field: 'deemedWriteOffDate', filter: 'agDateColumnFilter'  },
{ field: 'expensedBadDebtDate', filter: 'agDateColumnFilter'  },
{ field: 'paidDate', filter: 'agDateColumnFilter'  },
{ headerName: 'Ghost Account', field: 'ghostAccount', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'ghostedDate', filter: 'agDateColumnFilter'  },
{ field: 'ghostedBy', filter: 'agTextColumnFilter'  },
{ field: 'unGhostedDate', filter: 'agDateColumnFilter'  },
{ field: 'unGhostedBy', filter: 'agTextColumnFilter'  },
{ headerName: 'Additional Payment', field: 'additionalPayment', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Missing Bill', field: 'missingBill', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Missing Lien', field: 'missingLien', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Missing Medical Records', field: 'missingMedicalRecords', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'assignedTo', filter: 'agTextColumnFilter'  },
{ field: 'resubmitted', filter: 'agDateColumnFilter'  },
{ field: 'treatmentCity', filter: 'agTextColumnFilter'  },

{
      headerName: 'Origination',
      field: 'origination',
      valueFormatter: params => currencyFormatter(params.data?.origination, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Threshold Provider Rate',
      field: 'thresholdProviderRate',
      valueFormatter: params => currencyFormatter(params.data?.thresholdProviderRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Threshold Location Rate',
      field: 'thresholdLocationRate',
      valueFormatter: params => currencyFormatter(params.data?.thresholdLocationRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'teamLeaderRateSource', filter: 'agTextColumnFilter'  },
{ field: 'checkNumber', filter: 'agTextColumnFilter'  },
{ field: 'accountDateReceived', filter: 'agDateColumnFilter'  },
{ field: 'dateApplied', filter: 'agDateColumnFilter'  },

{
      headerName: 'Amount Applied',
      field: 'amountApplied',
      valueFormatter: params => currencyFormatter(params.data?.amountApplied, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'description', filter: 'agTextColumnFilter'  },
{ field: 'note', filter: 'agTextColumnFilter'  },

{
      headerName: 'Medicare Rate',
      field: 'medicareRate',
      valueFormatter: params => currencyFormatter(params.data?.medicareRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Provider Percent of Medicare',
      field: 'providerPercentOfMedicare',
      valueFormatter: params => currencyFormatter(params.data?.providerPercentOfMedicare, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Contracted Amount',
      field: 'contractedAmount',
      valueFormatter: params => currencyFormatter(params.data?.contractedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Markup Percent',
      field: 'markupPercent',
      valueFormatter: params => currencyFormatter(params.data?.markupPercent, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Reimbursed Total',
      field: 'reimbursedTotal',
      valueFormatter: params => currencyFormatter(params.data?.reimbursedTotal, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Initial Revenue',
      field: 'initialRevenue',
      valueFormatter: params => currencyFormatter(params.data?.initialRevenue, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Factor',
      field: 'factor',
      valueFormatter: params => currencyFormatter(params.data?.factor, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Retail Bill',
      field: 'retailBill',
      valueFormatter: params => currencyFormatter(params.data?.retailBill, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Est Margin',
      field: 'estMargin',
      valueFormatter: params => currencyFormatter(params.data?.estMargin, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Roi',
      field: 'roi',
      valueFormatter: params => currencyFormatter(params.data?.roi, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Attorney Paid',
      field: 'attorneyPaid',
      valueFormatter: params => currencyFormatter(params.data?.attorneyPaid, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Percent of Retail',
      field: 'percentOfRetail',
      valueFormatter: params => currencyFormatter(params.data?.percentOfRetail, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Reimbursed From PCR',
      field: 'reimbursedFromPCR',
      valueFormatter: params => currencyFormatter(params.data?.reimbursedFromPCR, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Ingredient Cost',
      field: 'ingredientCost',
      valueFormatter: params => currencyFormatter(params.data?.ingredientCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Dispensing Cost',
      field: 'dispensingCost',
      valueFormatter: params => currencyFormatter(params.data?.dispensingCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Administrative Cost',
      field: 'administrativeCost',
      valueFormatter: params => currencyFormatter(params.data?.administrativeCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Co Pay',
      field: 'coPay',
      valueFormatter: params => currencyFormatter(params.data?.coPay, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Total Cost',
      field: 'totalCost',
      valueFormatter: params => currencyFormatter(params.data?.totalCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Average Wholesale Price',
      field: 'averageWholesalePrice',
      valueFormatter: params => currencyFormatter(params.data?.averageWholesalePrice, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Weighted Average Cost',
      field: 'weightedAverageCost',
      valueFormatter: params => currencyFormatter(params.data?.weightedAverageCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Average Sale Price',
      field: 'averageSalePrice',
      valueFormatter: params => currencyFormatter(params.data?.averageSalePrice, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Invoice Cost',
      field: 'invoiceCost',
      valueFormatter: params => currencyFormatter(params.data?.invoiceCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Usual and Customary',
      field: 'usualAndCustomary',
      valueFormatter: params => currencyFormatter(params.data?.usualAndCustomary, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'nationalDrugCode', filter: 'agTextColumnFilter'  },
{ field: 'procedureVendorId', filter: 'agTextColumnFilter', hide:true }
  ]

  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows)
  }
  setSelected(ids: string[]) {
    this.tableView.gridApi.forEachNode((node) => {
      if (ids.includes(node.data?.id)) {
        node.setSelected(true)
      } else {
        node.setSelected(false)
      }
    })
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected)
  }
}

