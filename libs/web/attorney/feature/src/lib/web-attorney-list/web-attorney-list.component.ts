

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { WebAttorneySelectTableViewComponent } from '@case-clinical/web/attorney/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { WebAttorneyStatusFeatureStore } from '@case-clinical/web/attorney-status/shared'
import { WebAttorneyTypeFeatureStore } from '@case-clinical/web/attorney-type/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Attorney.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.attorneys"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="attorney"
          title="Attorney"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebAttorneyFeatureStore,
    WebFirmFeatureStore,
    WebAttorneyStatusFeatureStore,
    WebAttorneyTypeFeatureStore
],

})
export class WebAttorneyListComponent implements OnInit {
  @ViewChild(WebAttorneySelectTableViewComponent) tableView: WebAttorneySelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'firm.name', headerName: 'Firm', filter: 'agTextColumnFilter' },
{ field: 'attorneyStatus.name', headerName: 'Attorney Status', filter: 'agTextColumnFilter' },
{ field: 'attorneyType.name', headerName: 'Attorney Type', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firmId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'attorneyStatusId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'attorneyTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'title', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'zip', filter: 'agTextColumnFilter'  },
{ field: 'email', filter: 'agTextColumnFilter'  },
{ field: 'direct', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'cellPhone', filter: 'agTextColumnFilter'  },
{ field: 'barNumber', filter: 'agTextColumnFilter'  },
{ field: 'barState', filter: 'agTextColumnFilter'  },
{ headerName: 'Do Not Disturb', field: 'doNotDisturb', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'temp', filter: 'agTextColumnFilter'  },
{ field: 'createdById', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ headerName: 'Removed', field: 'removed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'migSource', filter: 'agTextColumnFilter'  },
{ field: 'entity', filter: 'agTextColumnFilter'  },
{ headerName: 'Firm Nolonger Needed', field: 'firmNolongerNeeded', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }]

  constructor(
    private readonly store: WebAttorneyFeatureStore,
    private readonly firmFeatureStore: WebFirmFeatureStore,
private readonly attorneyStatusFeatureStore: WebAttorneyStatusFeatureStore,
private readonly attorneyTypeFeatureStore: WebAttorneyTypeFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadAttorneysEffect()
    this.store.filterFirms('').subscribe()
    this.store.filterAttorneyStatuses('').subscribe()
    this.store.filterAttorneyTypes('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'firm':
          {
            const firmCreateActionResultListener = this.firmFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addFirm(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                firmCreateActionResultListener.unsubscribe();
              }
            })
            this.firmFeatureStore.createFirmEffect({ name: newName });
            break;
          }


        case 'attorneyStatus':
          {
            const attorneyStatusCreateActionResultListener = this.attorneyStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAttorneyStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                attorneyStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.attorneyStatusFeatureStore.createAttorneyStatusEffect({ name: newName });
            break;
          }


        case 'attorneyType':
          {
            const attorneyTypeCreateActionResultListener = this.attorneyTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAttorneyType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                attorneyTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.attorneyTypeFeatureStore.createAttorneyTypeEffect({ name: newName });
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
    this.store.loadAttorneysEffect()
  }
}
