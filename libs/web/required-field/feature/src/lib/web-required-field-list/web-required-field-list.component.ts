

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebRequiredFieldFeatureStore } from '@case-clinical/web/required-field/shared'
import { WebRequiredFieldSelectTableViewComponent } from '@case-clinical/web/required-field/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'

@Component({
  template: `
    <ng-container *featureFlag="'RequiredField.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.requiredFields"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="requiredField"
          title="RequiredField"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebRequiredFieldFeatureStore,
    WebAccidentTypeFeatureStore,
    WebMedLevelFeatureStore
],

})
export class WebRequiredFieldListComponent implements OnInit {
  @ViewChild(WebRequiredFieldSelectTableViewComponent) tableView: WebRequiredFieldSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'accidentType.name', headerName: 'Accident Type', filter: 'agTextColumnFilter' },
{ field: 'medLevel.name', headerName: 'Med Level', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'entityName', filter: 'agTextColumnFilter'  },
{ field: 'accidentTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'medLevelId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebRequiredFieldFeatureStore,
    private readonly accidentTypeFeatureStore: WebAccidentTypeFeatureStore,
private readonly medLevelFeatureStore: WebMedLevelFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadRequiredFieldsEffect()
    this.store.filterAccidentTypes('').subscribe()
    this.store.filterMedLevels('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'accidentType':
          {
            const accidentTypeCreateActionResultListener = this.accidentTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAccidentType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                accidentTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.accidentTypeFeatureStore.createAccidentTypeEffect({ name: newName });
            break;
          }


        case 'medLevel':
          {
            const medLevelCreateActionResultListener = this.medLevelFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addMedLevel(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                medLevelCreateActionResultListener.unsubscribe();
              }
            })
            this.medLevelFeatureStore.createMedLevelEffect({ name: newName });
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
    this.store.loadRequiredFieldsEffect()
  }
}
