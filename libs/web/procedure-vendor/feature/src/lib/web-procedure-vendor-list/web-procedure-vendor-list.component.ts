

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'
import { WebProcedureVendorSelectTableViewComponent } from '@case-clinical/web/procedure-vendor/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebProcedureVendorStatusFeatureStore } from '@case-clinical/web/procedure-vendor-status/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ProcedureVendor.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.procedureVendors"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="procedureVendor"
          title="ProcedureVendor"
          [cardViewTemplate]="cardViewTemplate"
        ></ui-data-list>
      </ng-container>
    </ng-container>

    <ng-template #cardViewTemplate>
      <ui-formly-json-form
        class="w-full h-full"
        [formName]="'procedureVendors_kanban_list'"
        [showSubmitButton]="false"
        [model]="{}"
        [componentStore]="store"
        [formData]="formData">
      </ui-formly-json-form>
    </ng-template>
`,
  providers: [
    WebProcedureVendorFeatureStore,
    WebCaseProcedureFeatureStore,
    WebContractFeatureStore,
    WebVendorFeatureStore,
    WebProcedureVendorStatusFeatureStore
],

})
export class WebProcedureVendorListComponent implements OnInit {
  @ViewChild(WebProcedureVendorSelectTableViewComponent) tableView: WebProcedureVendorSelectTableViewComponent

  readonly vm$ = this.store.vm$

  formData = {
    procedureVendors: this.store.procedureVendors$
  }

  columnDefs: any[] = [{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'status.name', headerName: 'Status', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'statusId', filter: 'agTextColumnFilter', hide:true },

{
      headerName: 'Estimate',
      field: 'estimate',
      valueFormatter: params => currencyFormatter(params.data?.estimate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Funding Approved', field: 'fundingApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }]

  constructor(
    public readonly store: WebProcedureVendorFeatureStore,
    private readonly caseProcedureFeatureStore: WebCaseProcedureFeatureStore,
private readonly contractFeatureStore: WebContractFeatureStore,
private readonly vendorFeatureStore: WebVendorFeatureStore,
private readonly procedureVendorStatusFeatureStore: WebProcedureVendorStatusFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadProcedureVendorsEffect()
    this.store.filterCaseProcedures('').subscribe()
    this.store.filterContracts('').subscribe()
    this.store.filterVendors('').subscribe()
    this.store.filterProcedureVendorStatuses('').subscribe()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'caseProcedure':
          {
            const caseProcedureCreateActionResultListener = this.caseProcedureFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCaseProcedure(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                caseProcedureCreateActionResultListener.unsubscribe();
              }
            })
            this.caseProcedureFeatureStore.createCaseProcedureEffect({ name: newName });
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


        case 'procedureVendorStatus':
          {
            const procedureVendorStatusCreateActionResultListener = this.procedureVendorStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedureVendorStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureVendorStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureVendorStatusFeatureStore.createProcedureVendorStatusEffect({ name: newName });
            break;
          }

        default:
          observer.next(false);
      }
    })
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
    this.store.loadProcedureVendorsEffect()
  }
}
