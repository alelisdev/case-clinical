

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-diagnosis-code/shared'
import { WebProcedureOrTreatmentRequestDiagnosisCodeSelectTableViewComponent } from '@case-clinical/web/procedure-or-treatment-request-diagnosis-code/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
import { WebProcedureOrTreatmentRequestFeatureStore } from '@case-clinical/web/procedure-or-treatment-request/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ProcedureOrTreatmentRequestDiagnosisCode.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.procedureOrTreatmentRequestDiagnosisCodes"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="procedureOrTreatmentRequestDiagnosisCode"
          title="ProcedureOrTreatmentRequestDiagnosisCode"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore,
    WebDiagnosisCodeFeatureStore,
    WebProcedureOrTreatmentRequestFeatureStore
],

})
export class WebProcedureOrTreatmentRequestDiagnosisCodeListComponent implements OnInit {
  @ViewChild(WebProcedureOrTreatmentRequestDiagnosisCodeSelectTableViewComponent) tableView: WebProcedureOrTreatmentRequestDiagnosisCodeSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'diagnosis.name', headerName: 'Diagnosis', filter: 'agTextColumnFilter' },
{ field: 'procedureOrTreatmentRequest.name', headerName: 'Procedure or Treatment Request', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCodeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'procedureOrTreatmentRequestId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore,
    private readonly diagnosisCodeFeatureStore: WebDiagnosisCodeFeatureStore,
private readonly procedureOrTreatmentRequestFeatureStore: WebProcedureOrTreatmentRequestFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadProcedureOrTreatmentRequestDiagnosisCodesEffect()
    this.store.filterDiagnosisCodes('').subscribe()
    this.store.filterProcedureOrTreatmentRequests('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'diagnosisCode':
          {
            const diagnosisCodeCreateActionResultListener = this.diagnosisCodeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addDiagnosisCode(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                diagnosisCodeCreateActionResultListener.unsubscribe();
              }
            })
            this.diagnosisCodeFeatureStore.createDiagnosisCodeEffect({ name: newName });
            break;
          }


        case 'procedureOrTreatmentRequest':
          {
            const procedureOrTreatmentRequestCreateActionResultListener = this.procedureOrTreatmentRequestFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedureOrTreatmentRequest(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureOrTreatmentRequestCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureOrTreatmentRequestFeatureStore.createProcedureOrTreatmentRequestEffect({ name: newName });
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
    this.store.loadProcedureOrTreatmentRequestDiagnosisCodesEffect()
  }
}
