

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { WebFirmSelectTableViewComponent } from '@case-clinical/web/firm/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebFirmStatusFeatureStore } from '@case-clinical/web/firm-status/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Firm.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.firms"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="firm"
          title="Firm"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebFirmFeatureStore,
    WebFirmStatusFeatureStore
],

})
export class WebFirmListComponent implements OnInit {
  @ViewChild(WebFirmSelectTableViewComponent) tableView: WebFirmSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'firmStatus.name', headerName: 'Firm Status', filter: 'agTextColumnFilter' },
{ field: 'eula.name', headerName: 'Eula', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firmStatusNote', filter: 'agTextColumnFilter'  },
{ field: 'firmStatusId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'firmName', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  },
{ field: 'address2', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'zip', filter: 'agTextColumnFilter'  },
{ field: 'country', filter: 'agTextColumnFilter'  },
{ field: 'office', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'webAddress', filter: 'agTextColumnFilter'  },
{ field: 'email', filter: 'agTextColumnFilter'  },

{
      headerName: 'Rating',
      field: 'rating',
      valueFormatter: params => currencyFormatter(params.data?.rating, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ headerName: 'Do Not Disturb', field: 'doNotDisturb', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Invoice Only', field: 'invoiceOnly', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'reductionNotes', filter: 'agTextColumnFilter'  },
{ headerName: 'Deceased', field: 'deceased', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ field: 'eulaId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebFirmFeatureStore,
    private readonly firmStatusFeatureStore: WebFirmStatusFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadFirmsEffect()
    this.store.filterFirmStatuses('').subscribe()
    this.store.filterDocuments('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'firmStatus':
          {
            const firmStatusCreateActionResultListener = this.firmStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addFirmStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                firmStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.firmStatusFeatureStore.createFirmStatusEffect({ name: newName });
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
    this.store.loadFirmsEffect()
  }
}
