

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLeadSelectTableViewComponent } from '@case-clinical/web/lead/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import { WebLeadStatusFeatureStore } from '@case-clinical/web/lead-status/shared'
import { WebLeadSourceFeatureStore } from '@case-clinical/web/lead-source/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Lead.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.leads"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="lead"
          title="Lead"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebLeadFeatureStore,
    WebAccidentTypeFeatureStore,
    WebLeadStatusFeatureStore,
    WebLeadSourceFeatureStore,
    WebUserFeatureStore
],

})
export class WebLeadListComponent implements OnInit {
  @ViewChild(WebLeadSelectTableViewComponent) tableView: WebLeadSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'accidentType.name', headerName: 'Accident Type', filter: 'agTextColumnFilter' },
{ field: 'driversLicense.name', headerName: 'Drivers License', filter: 'agTextColumnFilter' },
{ field: 'policeReportAttachment.name', headerName: 'Police Report Attachment', filter: 'agTextColumnFilter' },
{ field: 'phoneRecording.name', headerName: 'Phone Recording', filter: 'agTextColumnFilter' },
{ field: 'status.name', headerName: 'Status', filter: 'agTextColumnFilter' },
{ field: 'sourceOfLead.name', headerName: 'Source of Lead', filter: 'agTextColumnFilter' },
{ field: 'submittedBy.name', headerName: 'Submitted by', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'middleName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'dateOfLoss', filter: 'agDateColumnFilter'  },
{ field: 'dateOfRetention', filter: 'agDateColumnFilter'  },
{ field: 'phoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'emailAddress', filter: 'agTextColumnFilter'  },
{ field: 'priorRepresentation', filter: 'agTextColumnFilter'  },
{ field: 'accidentTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'driversLicenseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'driversLicenseNumber', filter: 'agTextColumnFilter'  },
{ field: 'driversLicenseState', filter: 'agTextColumnFilter'  },
{ headerName: 'Severe Injury', field: 'severeInjury', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'emergencyContactId', filter: 'agTextColumnFilter'  },
{ headerName: 'Allowed to Contact Emergency Contact', field: 'allowedToContactEmergencyContact', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Police Report', field: 'policeReport', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'policeReportAttachmentId', filter: 'agTextColumnFilter', hide:true },
{ field: 'phoneRecordingId', filter: 'agTextColumnFilter', hide:true },
{ field: 'leadStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'leadSpecialistId', filter: 'agTextColumnFilter'  },
{ field: 'leadSourceId', filter: 'agTextColumnFilter', hide:true },
{ field: 'submittedById', filter: 'agTextColumnFilter', hide:true },
{ field: 'legalCaseId', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebLeadFeatureStore,
    private readonly accidentTypeFeatureStore: WebAccidentTypeFeatureStore,
private readonly leadStatusFeatureStore: WebLeadStatusFeatureStore,
private readonly leadSourceFeatureStore: WebLeadSourceFeatureStore,
private readonly userFeatureStore: WebUserFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadLeadsEffect()
    this.store.filterAccidentTypes('').subscribe()
    this.store.filterDocuments('').subscribe()
    this.store.filterLeadStatuses('').subscribe()
    this.store.filterLeadSources('').subscribe()
    this.store.filterUsers('').subscribe()
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


        case 'leadStatus':
          {
            const leadStatusCreateActionResultListener = this.leadStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLeadStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                leadStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.leadStatusFeatureStore.createLeadStatusEffect({ name: newName });
            break;
          }


        case 'leadSource':
          {
            const leadSourceCreateActionResultListener = this.leadSourceFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLeadSource(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                leadSourceCreateActionResultListener.unsubscribe();
              }
            })
            this.leadSourceFeatureStore.createLeadSourceEffect({ name: newName });
            break;
          }


        case 'user':
          {
            const userCreateActionResultListener = this.userFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addUser(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                userCreateActionResultListener.unsubscribe();
              }
            })
            this.userFeatureStore.createUserEffect({ name: newName });
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
    this.store.loadLeadsEffect()
  }
}
