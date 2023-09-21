

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebPatientSelectTableViewComponent } from '@case-clinical/web/patient/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebEthnicityFeatureStore } from '@case-clinical/web/ethnicity/shared'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
import { WebLanguageFeatureStore } from '@case-clinical/web/language/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Patient.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.patients"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="patient"
          title="Patient"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPatientFeatureStore,
    WebEthnicityFeatureStore,
    WebGenderFeatureStore,
    WebLanguageFeatureStore
],

})
export class WebPatientListComponent implements OnInit {
  @ViewChild(WebPatientSelectTableViewComponent) tableView: WebPatientSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'ethnicity.name', headerName: 'Ethnicity', filter: 'agTextColumnFilter' },
{ field: 'gender.name', headerName: 'Gender', filter: 'agTextColumnFilter' },
{ field: 'language.name', headerName: 'Language', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'middleName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'suffix', filter: 'agTextColumnFilter'  },
{ field: 'genderId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'nickname', filter: 'agTextColumnFilter'  },
{ field: 'height', filter: 'agTextColumnFilter'  },
{ field: 'weight', filter: 'agTextColumnFilter'  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'},
{ field: 'primaryPhoneNumber', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Primary Phone Mobile', field: 'isPrimaryPhoneMobile', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'secondaryPhoneNumber', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Secondary Phone Mobile', field: 'isSecondaryPhoneMobile', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'memberRegistrationNumber', filter: 'agTextColumnFilter'  },
{ field: 'ethnicityId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'languageId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Requires Translator', field: 'requiresTranslator', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'socialSecurityNumber', filter: 'agTextColumnFilter'  },
{ field: 'honorific', filter: 'agTextColumnFilter'  },
{ field: 'primaryEmailAddress', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine2', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressStateOrProvince', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },

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
{ field: 'emergencyContactId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'homePhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'mobileNumber', filter: 'agTextColumnFilter'  },
{ field: 'bmi', filter: 'agTextColumnFilter'  },
{ field: 'occupation', filter: 'agTextColumnFilter'  },
{ field: 'debtorRemarks', filter: 'agTextColumnFilter'  },
{ field: 'workAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'workAddressLine2', filter: 'agTextColumnFilter'  },
{ field: 'workAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'workAddressStateOrProvince', filter: 'agTextColumnFilter'  },
{ field: 'workAddressPostalCode', filter: 'agTextColumnFilter'  },

{
      headerName: 'Work Latitude',
      field: 'workLatitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Work Longitude',
      field: 'workLongitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}
]

  constructor(
    private readonly store: WebPatientFeatureStore,
    private readonly ethnicityFeatureStore: WebEthnicityFeatureStore,
private readonly genderFeatureStore: WebGenderFeatureStore,
private readonly languageFeatureStore: WebLanguageFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPatientsEffect()
    this.store.filterEthnicities('').subscribe()
    this.store.filterGenders('').subscribe()
    this.store.filterLanguages('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'ethnicity':
          {
            const ethnicityCreateActionResultListener = this.ethnicityFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addEthnicity(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                ethnicityCreateActionResultListener.unsubscribe();
              }
            })
            this.ethnicityFeatureStore.createEthnicityEffect({ name: newName });
            break;
          }


        case 'gender':
          {
            const genderCreateActionResultListener = this.genderFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addGender(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                genderCreateActionResultListener.unsubscribe();
              }
            })
            this.genderFeatureStore.createGenderEffect({ name: newName });
            break;
          }


        case 'language':
          {
            const languageCreateActionResultListener = this.languageFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLanguage(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                languageCreateActionResultListener.unsubscribe();
              }
            })
            this.languageFeatureStore.createLanguageEffect({ name: newName });
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
    this.store.loadPatientsEffect()
  }
}
