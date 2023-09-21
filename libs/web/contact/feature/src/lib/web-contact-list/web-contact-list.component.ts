

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import { WebContactSelectTableViewComponent } from '@case-clinical/web/contact/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebContactKindFeatureStore } from '@case-clinical/web/contact-kind/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Contact.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.contacts"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="contact"
          title="Contact"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebContactFeatureStore,
    WebContactKindFeatureStore
],

})
export class WebContactListComponent implements OnInit {
  @ViewChild(WebContactSelectTableViewComponent) tableView: WebContactSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'contactKind.name', headerName: 'Contact Kind', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'honorific', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'suffix', filter: 'agTextColumnFilter'  },
{ field: 'primaryPhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'primaryEmailAddress', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine2', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressStateOrProvince', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'discriminator', filter: 'agTextColumnFilter'  },
{ field: 'contactKindId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },

{
      headerName: 'Latitude',
      field: 'latitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Longitude',
      field: 'longitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'avatar', filter: 'agTextColumnFilter'  },
{ field: 'background', filter: 'agTextColumnFilter'  },
{ field: 'title', filter: 'agTextColumnFilter'  },
{ field: 'company', filter: 'agTextColumnFilter'  },
{ field: 'birthday', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebContactFeatureStore,
    private readonly contactKindFeatureStore: WebContactKindFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadContactsEffect()
    this.store.filterContactKinds('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'contactKind':
          {
            const contactKindCreateActionResultListener = this.contactKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContactKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contactKindCreateActionResultListener.unsubscribe();
              }
            })
            this.contactKindFeatureStore.createContactKindEffect({ name: newName });
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
    this.store.loadContactsEffect()
  }
}
