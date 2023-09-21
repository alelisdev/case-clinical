

import { Component, OnInit, ViewChild } from '@angular/core'
import { WebDocumentListStore } from './web-document-list.store'
import { WebDocumentSelectTableViewComponent } from '@case-clinical/web/document/ui';
import { ColDef } from '@ag-grid-community/core';
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ng-container *featureFlag="'Document.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.data"
          [columnDefs]="columnDefs"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="document"
          title="Document"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [WebDocumentListStore],
})
export class WebDocumentListComponent implements OnInit {
  @ViewChild(WebDocumentSelectTableViewComponent) tableView: WebDocumentSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'prescription.name', headerName: 'Prescription', filter: 'agTextColumnFilter' },
{ field: 'provider.name', headerName: 'Provider', filter: 'agTextColumnFilter' },
{ field: 'patientStudies.name', headerName: 'Patient Studies', filter: 'agTextColumnFilter' },
{ field: 'procedureVendor.name', headerName: 'Procedure Vendor', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'attachment', filter: 'agTextColumnFilter'  },
{ field: 'encoding', filter: 'agTextColumnFilter'  },
{ field: 'extension', filter: 'agTextColumnFilter'  },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'prescriptionId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'providerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'patientStudyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'procedureVendorId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebDocumentListStore,
  ) {
  }

 ngOnInit(): void {
    this.store.loadDocumentsEffect()
 }

  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) {this.store.importExcelEffect(excelData)}

  searchQueryDidChange(searchQuery) {this.store.setSearchQuery(searchQuery)
    this.store.loadDocumentsEffect()
  }
}
