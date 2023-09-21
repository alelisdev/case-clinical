

import { Component, OnInit, ViewChild } from '@angular/core'
import { WebTemplateListStore } from './web-template-list.store'
import { WebTemplateSelectTableViewComponent } from '@case-clinical/web/template/ui';
import { ColDef } from '@ag-grid-community/core';
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ng-container *featureFlag="'Template.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.data"
          [columnDefs]="columnDefs"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="template"
          title="Template"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [WebTemplateListStore],
})
export class WebTemplateListComponent implements OnInit {
  @ViewChild(WebTemplateSelectTableViewComponent) tableView: WebTemplateSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'attachment', filter: 'agTextColumnFilter'  },
{ field: 'encoding', filter: 'agTextColumnFilter'  },
{ field: 'signatureFileType', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebTemplateListStore,
  ) {
  }

 ngOnInit(): void {
    this.store.loadTemplatesEffect()
 }

  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) {this.store.importExcelEffect(excelData)}

  searchQueryDidChange(searchQuery) {this.store.setSearchQuery(searchQuery)
    this.store.loadTemplatesEffect()
  }
}
