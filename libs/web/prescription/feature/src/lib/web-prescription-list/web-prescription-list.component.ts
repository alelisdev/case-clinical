

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import { WebPrescriptionSelectTableViewComponent } from '@case-clinical/web/prescription/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Prescription.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.prescriptions"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="prescription"
          title="Prescription"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPrescriptionFeatureStore,
    WebPatientFeatureStore
],

})
export class WebPrescriptionListComponent implements OnInit {
  @ViewChild(WebPrescriptionSelectTableViewComponent) tableView: WebPrescriptionSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'document.name', headerName: 'Document', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'medicalProvider', filter: 'agTextColumnFilter'  },
{ field: 'dateWritten', filter: 'agDateColumnFilter'  },
{ field: 'days', filter: 'agTextColumnFilter'  },
{ field: 'note', filter: 'agTextColumnFilter'  },
{ field: 'category', filter: 'agTextColumnFilter'  },
{ field: 'kind', filter: 'agTextColumnFilter'  },

{
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => currencyFormatter(params.data?.quantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'refills', filter: 'agTextColumnFilter'  },
{ field: 'rxNumber', filter: 'agTextColumnFilter'  },
{ field: 'sig', filter: 'agTextColumnFilter'  },
{ field: 'strength', filter: 'agTextColumnFilter'  },
{ field: 'unit', filter: 'agTextColumnFilter'  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'documentId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebPrescriptionFeatureStore,
    private readonly patientFeatureStore: WebPatientFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPrescriptionsEffect()
    this.store.filterPatients('').subscribe()
    this.store.filterDocuments('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'patient':
          {
            const patientCreateActionResultListener = this.patientFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPatient(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                patientCreateActionResultListener.unsubscribe();
              }
            })
            this.patientFeatureStore.createPatientEffect({ name: newName });
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
    this.store.loadPrescriptionsEffect()
  }
}
