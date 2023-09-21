

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebUserSelectTableViewComponent } from '@case-clinical/web/user/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'

@Component({
  template: `
    <ng-container *featureFlag="'User.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.users"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="user"
          title="User"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebUserFeatureStore,
    WebPatientFeatureStore,
    WebClinicalProviderFeatureStore,
    WebAttorneyFeatureStore
],

})
export class WebUserListComponent implements OnInit {
  @ViewChild(WebUserSelectTableViewComponent) tableView: WebUserSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'provider.name', headerName: 'Provider', filter: 'agTextColumnFilter' },
{ field: 'attorney.name', headerName: 'Attorney', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ headerName: 'Developer', field: 'developer', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'username', filter: 'agTextColumnFilter'  },
{ field: 'password', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'avatarUrl', filter: 'agTextColumnFilter'  },
{ field: 'line1', filter: 'agTextColumnFilter'  },
{ field: 'line2', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'phone', filter: 'agTextColumnFilter'  },
{ field: 'bio', filter: 'agTextColumnFilter'  },
{ field: 'slug', filter: 'agTextColumnFilter'  },
{ field: 'status', filter: 'agTextColumnFilter'  },

{
      headerName: 'Signup Status',
      field: 'signupStatus',
      valueFormatter: params => currencyFormatter(params.data.signupStatus, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Verified', field: 'verified', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'customerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'planId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'cellPhone', filter: 'agTextColumnFilter'  },
{ field: 'education', filter: 'agTextColumnFilter'  },
{ field: 'attorneyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'providerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebUserFeatureStore,
    private readonly patientFeatureStore: WebPatientFeatureStore,
private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore,
private readonly attorneyFeatureStore: WebAttorneyFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadUsersEffect()
    this.store.filterPatients('').subscribe()
    this.store.filterClinicalProviders('').subscribe()
    this.store.filterAttorneys('').subscribe()
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


        case 'clinicalProvider':
          {
            const clinicalProviderCreateActionResultListener = this.clinicalProviderFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClinicalProvider(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                clinicalProviderCreateActionResultListener.unsubscribe();
              }
            })
            this.clinicalProviderFeatureStore.createClinicalProviderEffect({ name: newName });
            break;
          }


        case 'attorney':
          {
            const attorneyCreateActionResultListener = this.attorneyFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAttorney(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                attorneyCreateActionResultListener.unsubscribe();
              }
            })
            this.attorneyFeatureStore.createAttorneyEffect({ name: newName });
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
    this.store.loadUsersEffect()
  }
}
