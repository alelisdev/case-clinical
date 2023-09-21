

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import { WebCaseAccountSelectTableViewComponent } from '@case-clinical/web/case-account/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebAccountStatusFeatureStore } from '@case-clinical/web/account-status/shared'
import { WebProcedureTypeFeatureStore } from '@case-clinical/web/procedure-type/shared'
import { WebAgreementTypeFeatureStore } from '@case-clinical/web/agreement-type/shared'
import { WebClaimProcedureFeatureStore } from '@case-clinical/web/claim-procedure/shared'
import { WebInvoiceDetailFeatureStore } from '@case-clinical/web/invoice-detail/shared'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebPortfolioFeatureStore } from '@case-clinical/web/portfolio/shared'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'

@Component({
  template: `
    <ng-container *featureFlag="'CaseAccount.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.caseAccounts"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          (selectionDidChange)="selectionDidChange($event)"
          tableName="caseAccount"
          title="CaseAccount"
          [checkBoxSelection]="true"
          [actionTemplateForCheckBox]="actionTemplateForCheckBox"
        ></ui-data-list>
      </ng-container>
    </ng-container>

    <ng-template #actionTemplateForCheckBox>
      <ui-formly-json-form
        [formName]="'caseAccount_invoiceCreate'"
        [showSubmitButton]="false"
        [formData]="formData"
        *ngIf=" formData?.selectedItems.length > 0"
      ></ui-formly-json-form>
    </ng-template>
`,
  providers: [
    WebCaseAccountFeatureStore,
    WebLegalCaseFeatureStore,
    WebLocationFeatureStore,
    WebVendorFeatureStore,
    WebAccountStatusFeatureStore,
    WebProcedureTypeFeatureStore,
    WebAgreementTypeFeatureStore,
    WebClaimProcedureFeatureStore,
    WebInvoiceDetailFeatureStore,
    WebContractFeatureStore,
    WebPortfolioFeatureStore,
    WebProcedureVendorFeatureStore
],

})
export class WebCaseAccountListComponent implements OnInit {
  @ViewChild(WebCaseAccountSelectTableViewComponent) tableView: WebCaseAccountSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
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
{ field: 'procedureVendorId', filter: 'agTextColumnFilter', hide:true }]

  formData:any = {
    selectedItems: []
  };
  constructor(
    private readonly store: WebCaseAccountFeatureStore,
    private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
private readonly locationFeatureStore: WebLocationFeatureStore,
private readonly vendorFeatureStore: WebVendorFeatureStore,
private readonly accountStatusFeatureStore: WebAccountStatusFeatureStore,
private readonly procedureTypeFeatureStore: WebProcedureTypeFeatureStore,
private readonly agreementTypeFeatureStore: WebAgreementTypeFeatureStore,
private readonly claimProcedureFeatureStore: WebClaimProcedureFeatureStore,
private readonly invoiceDetailFeatureStore: WebInvoiceDetailFeatureStore,
private readonly contractFeatureStore: WebContractFeatureStore,
private readonly portfolioFeatureStore: WebPortfolioFeatureStore,
private readonly procedureVendorFeatureStore: WebProcedureVendorFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadCaseAccountsEffect()
    this.store.filterLegalCases('').subscribe()
    this.store.filterLocations('').subscribe()
    this.store.filterVendors('').subscribe()
    this.store.filterAccountStatuses('').subscribe()
    this.store.filterProcedureTypes('').subscribe()
    this.store.filterAgreementTypes('').subscribe()
    this.store.filterClaimProcedures('').subscribe()
    this.store.filterInvoiceDetails('').subscribe()
    this.store.filterContracts('').subscribe()
    this.store.filterPortfolios('').subscribe()
    this.store.filterProcedureVendors('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'legalCase':
          {
            const legalCaseCreateActionResultListener = this.legalCaseFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLegalCase(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                legalCaseCreateActionResultListener.unsubscribe();
              }
            })
            this.legalCaseFeatureStore.createLegalCaseEffect({ name: newName });
            break;
          }


        case 'location':
          {
            const locationCreateActionResultListener = this.locationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLocation(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                locationCreateActionResultListener.unsubscribe();
              }
            })
            this.locationFeatureStore.createLocationEffect({ name: newName });
            break;
          }


        case 'vendor':
          {
            const vendorCreateActionResultListener = this.vendorFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVendor(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                vendorCreateActionResultListener.unsubscribe();
              }
            })
            this.vendorFeatureStore.createVendorEffect({ name: newName });
            break;
          }


        case 'accountStatus':
          {
            const accountStatusCreateActionResultListener = this.accountStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAccountStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                accountStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.accountStatusFeatureStore.createAccountStatusEffect({ name: newName });
            break;
          }


        case 'procedureType':
          {
            const procedureTypeCreateActionResultListener = this.procedureTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedureType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureTypeFeatureStore.createProcedureTypeEffect({ name: newName });
            break;
          }


        case 'agreementType':
          {
            const agreementTypeCreateActionResultListener = this.agreementTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAgreementType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                agreementTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.agreementTypeFeatureStore.createAgreementTypeEffect({ name: newName });
            break;
          }


        case 'claimProcedure':
          {
            const claimProcedureCreateActionResultListener = this.claimProcedureFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClaimProcedure(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                claimProcedureCreateActionResultListener.unsubscribe();
              }
            })
            this.claimProcedureFeatureStore.createClaimProcedureEffect({ name: newName });
            break;
          }


        case 'invoiceDetail':
          {
            const invoiceDetailCreateActionResultListener = this.invoiceDetailFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addInvoiceDetail(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                invoiceDetailCreateActionResultListener.unsubscribe();
              }
            })
            this.invoiceDetailFeatureStore.createInvoiceDetailEffect({ name: newName });
            break;
          }


        case 'contract':
          {
            const contractCreateActionResultListener = this.contractFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContract(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contractCreateActionResultListener.unsubscribe();
              }
            })
            this.contractFeatureStore.createContractEffect({ name: newName });
            break;
          }


        case 'portfolio':
          {
            const portfolioCreateActionResultListener = this.portfolioFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPortfolio(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                portfolioCreateActionResultListener.unsubscribe();
              }
            })
            this.portfolioFeatureStore.createPortfolioEffect({ name: newName });
            break;
          }


        case 'procedureVendor':
          {
            const procedureVendorCreateActionResultListener = this.procedureVendorFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedureVendor(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureVendorCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureVendorFeatureStore.createProcedureVendorEffect({ name: newName });
            break;
          }

        default:
          observer.next(false);
      }
    })
  }

  selectionDidChange($event){
    console.log('----------');
    console.log($event);
    this.formData = {
      selectedItems: $event
    }
  }
  validateImportData(excelData: any[]) {
    return new Observable((resolver) => {
      this.store.validateImportData(excelData).subscribe((result) => {
        resolver.next(result);
        resolver.complete();
      }).unsubscribe();
    })
  }


  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) { this.store.importExcelEffect(excelData) }

  searchQueryDidChange(searchQuery) {
    this.store.setSearchQuery(searchQuery)
    this.store.loadCaseAccountsEffect()
  }
}
